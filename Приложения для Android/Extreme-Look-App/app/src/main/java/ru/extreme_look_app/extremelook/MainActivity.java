package -----//-----;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import androidx.annotation.NonNull;
import android.app.AlertDialog;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.View;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.content.Context;
import android.webkit.WebChromeClient;
import android.widget.FrameLayout;
import com.google.firebase.messaging.FirebaseMessaging;
import android.content.ClipboardManager;
import android.content.ClipData;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {
    private boolean withoutErrors = true;
    private boolean websiteLoaded = false;
    private WebView preloader;
    private WebView browser;
    private static final int REQUEST_FINE_LOCATION = 1;
    private String mGeolocationOrigin;
    private GeolocationPermissions.Callback mGeolocationCallback;

    private final String scheme = "https://";
    private final String domain = "-----//-----";

    private String pushToken = "";
    private String PATHNOTIFICATION = "";

    String versionApp = BuildConfig.VERSION_NAME;

    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent intent = getIntent();
        Bundle extras = intent.getExtras();

        String appLinkAction = intent.getAction();
        Uri appLinkData = intent.getData();
        Log.d("EX_LINK_DATA", String.valueOf(appLinkData));
        Log.d("EX_LINK_DATA_action", String.valueOf(appLinkAction));

        if(extras != null && extras.get("show_notification") != null) {
            if (extras.get("url") != null)
                PATHNOTIFICATION = (String) extras.get("url");
            else
                PATHNOTIFICATION = "/";
        }

        preloader = findViewById(R.id.urlpreload);
        preloader.loadUrl(scheme + domain + "-----//-----");
        preloader.setBackgroundColor(Color.parseColor("#FFFFFF"));
        preloader.getSettings().setLoadWithOverviewMode(true);
        preloader.getSettings().setUseWideViewPort(true);

        browser = findViewById(R.id.browser);
        browser.setVisibility(View.GONE);
        browser.setWebViewClient(new BrowserClient(browser));
        browser.setVerticalScrollBarEnabled(false);
        browser.setHorizontalScrollBarEnabled(false);
        browser.getSettings().setUserAgentString("-----//-----");
        browser.getSettings().setDomStorageEnabled(true);
        browser.getSettings().setSupportZoom(false);
        browser.getSettings().setJavaScriptEnabled(true);
        browser.getSettings().setGeolocationEnabled(true);
        browser.getSettings().setDatabaseEnabled(true);
        browser.getSettings().setSupportMultipleWindows(false);
        browser.getSettings().setLoadWithOverviewMode(true);
        browser.getSettings().setAllowFileAccess(true);
        browser.setWebChromeClient(new ChromeClient());
        browser.addJavascriptInterface(new CustomJavaScriptInterface(this.getApplicationContext()), "Android");
        browser.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                pushToken = task.getResult();
            }
        });

        // Проверяем доступность сайта и открываем его, либо закрываем приложение
        new Thread(() -> {
            try {
                HttpURLConnection.setFollowRedirects(false);
                HttpURLConnection con = (HttpURLConnection) new URL(scheme + domain).openConnection();

                con.setRequestMethod("HEAD");
                con.setConnectTimeout(10000);

                if (con.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    browser.post(() -> {
                        if (!PATHNOTIFICATION.equals("")) {
                            browser.loadUrl(scheme + domain + PATHNOTIFICATION);
                        } else {
                            browser.loadUrl(scheme + domain);
                        }
                    });
                } else {
                    alertAndClose();
                }
            } catch (IOException e) {
                alertAndClose();
            }
        }).start();
    }

    public void onPause() {
        super.onPause();  // Always call the superclass method first
        browser.evaluateJavascript("app.methods.stopVideos();", null);
    }

    public void alertAndClose() {
        // Передаем пост в UI поток
        browser.post(() -> {
            withoutErrors = false;
            websiteLoaded = false;

            AlertDialog.Builder errorNotification = new AlertDialog.Builder(MainActivity.this);
            errorNotification.setTitle("Ошибка соединения")
                    .setMessage("Приложение будет закрыто")
                    .setCancelable(false)
                    .setNegativeButton("ОК",
                            (dialog, id) -> {
                                dialog.cancel();
                                finish();
                            });
            AlertDialog alert = errorNotification.create();
            alert.show();
        });
    }

    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_FINE_LOCATION) {
            boolean allow = grantResults[0] == PackageManager.PERMISSION_GRANTED;
            if (mGeolocationCallback != null) {
                mGeolocationCallback.invoke(mGeolocationOrigin, allow, false);
            }
        }
    }

    public void onBackPressed() {
        if (!websiteLoaded)
            finish();
        else if (browser.getUrl().startsWith(scheme + domain))
            browser.evaluateJavascript("Android.backPressed(backPressed());", null);
        else if (browser.canGoBack())
            browser.goBack();
        else
            browser.loadUrl(scheme + domain);
    }

    public void externalURL(final String url) {
        browser.post(() -> browser.loadUrl(scheme + domain + url));
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d("EX_ACTIVITY_RESULT", String.valueOf(requestCode));
    }

    protected void onNewIntent (Intent intent) {
        super.onNewIntent(intent);
        String show = intent.getStringExtra("show_notification");
        String url = intent.getStringExtra("url");
        if(show != null && url != null) {
            browser.post(() -> browser.loadUrl(scheme + domain + url));
        }
    }

    public class CustomJavaScriptInterface {

        @SuppressWarnings("unused")
        CustomJavaScriptInterface(Context c) {
        }

        @SuppressWarnings("unused")
        @JavascriptInterface
        public void openExternalLinks(String url) { externalURL(url); }

        @SuppressWarnings("unused")
        @JavascriptInterface
        public String getMyVersion() { return versionApp; }

        @SuppressWarnings("unused")
        @JavascriptInterface
        public void openOtherLink(String shareText) {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(shareText)));
        }

        @SuppressWarnings("unused")
        @JavascriptInterface
        public void backPressed(String response) {
            if (response.equals("close")) {
                finish();
            }
        }

        @SuppressWarnings("unused")
        @JavascriptInterface
        public void openMarket() {
            final String appPackageName = getPackageName();
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + appPackageName)));
            } catch (android.content.ActivityNotFoundException ex) {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + appPackageName)));
            }
        }

        @SuppressWarnings("unused")
        @JavascriptInterface
        public boolean copyTextLinkShare(String label, String text) {
            ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            ClipData clip = ClipData.newPlainText(label, text);
            clipboard.setPrimaryClip(clip);
            return true;
        }

        @SuppressWarnings("unused")
        @JavascriptInterface
        public void openFileGallery(){
            Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
            photoPickerIntent.setType("image/*");
            startActivity(photoPickerIntent);
        }
    }

    private class BrowserClient extends WebViewClient {

        WebView browser;

        BrowserClient(WebView parent) {
            this.browser = parent;
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) { //Устарело
            if (url.contains("tel:")) {
                startActivity(new Intent(Intent.ACTION_DIAL, Uri.parse(url)));
                return true;
            } else if (url.contains("https://www.instagram.com")) {
                startActivity(new Intent(android.content.Intent.ACTION_VIEW, Uri.parse(url)));
                return true;
            } else if (url.contains("mailto:")) {
                startActivity(new Intent(Intent.ACTION_SENDTO, Uri.parse(url)));
                return true;
            }
            return false;
        }

        public void onPageFinished(WebView view, String url) {
            if (withoutErrors) {
                websiteLoaded = true;
                view.setVisibility(View.VISIBLE); //Отображает веб страницу
                preloader.setVisibility(View.GONE); //Скрывает прелоадер
            }

            browser.evaluateJavascript("setPushToken('" + pushToken + "')", null);
            browser.evaluateJavascript("setVersionApp('" + versionApp + "')", null);
        }

        @Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            Log.d("EX_Исключение загрузки", String.valueOf(errorCode));
            alertAndClose();
        }
    }

    private class ChromeClient extends WebChromeClient {
        private View mCustomView;
        private WebChromeClient.CustomViewCallback mCustomViewCallback;
        private int mOriginalOrientation;
        private int mOriginalSystemUiVisibility;

        public Bitmap getDefaultVideoPoster()
        {
            if (mCustomView == null) {
                return null;
            }
            return BitmapFactory.decodeResource(getApplicationContext().getResources(), 2130837573);
        }

        public void onHideCustomView()
        {
            ((FrameLayout)getWindow().getDecorView()).removeView(this.mCustomView);
            this.mCustomView = null;
            getWindow().getDecorView().setSystemUiVisibility(this.mOriginalSystemUiVisibility);
            setRequestedOrientation(this.mOriginalOrientation);
            this.mCustomViewCallback.onCustomViewHidden();
            this.mCustomViewCallback = null;
        }

        public void onShowCustomView(View paramView, WebChromeClient.CustomViewCallback paramCustomViewCallback)
        {
            if (this.mCustomView != null)
            {
                onHideCustomView();
                return;
            }
            this.mCustomView = paramView;
            this.mOriginalSystemUiVisibility = getWindow().getDecorView().getSystemUiVisibility();
            this.mOriginalOrientation = getRequestedOrientation();
            this.mCustomViewCallback = paramCustomViewCallback;
            ((FrameLayout)getWindow().getDecorView()).addView(this.mCustomView, new FrameLayout.LayoutParams(-1, -1));
            getWindow().getDecorView().setSystemUiVisibility(3846);
        }

        public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
            String perm = Manifest.permission.ACCESS_FINE_LOCATION;
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M ||
                ContextCompat.checkSelfPermission(MainActivity.this, perm) == PackageManager.PERMISSION_GRANTED) {
                // we're on SDK < 23 OR user has already granted permission
                callback.invoke(origin, true, false);
            } else {
                if (!ActivityCompat.shouldShowRequestPermissionRationale(MainActivity.this, perm)) {
                    ActivityCompat.requestPermissions(MainActivity.this, new String[] {perm}, REQUEST_FINE_LOCATION);

                    mGeolocationOrigin = origin;
                    mGeolocationCallback = callback;
                }
            }
        }
    }
}