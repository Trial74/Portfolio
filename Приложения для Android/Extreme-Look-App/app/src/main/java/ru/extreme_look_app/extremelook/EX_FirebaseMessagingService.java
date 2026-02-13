package ru.extreme_look_app.extremelook;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.app.NotificationManager;
import android.util.Log;

import java.util.Map;

@SuppressLint("MissingFirebaseInstanceTokenRefresh")
public class EX_FirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d("EX_Пуш_лог", "Пришло уведомление");
        sendNotification(
                remoteMessage.getData()
        );
   }

   @SuppressLint("UnspecifiedImmutableFlag")
   private void sendNotification(Map<String, String> messageData){
        Intent intent = new Intent(this, MainActivity.class);

        intent.putExtra("show_notification", messageData.get("show_notification"));
        intent.putExtra("url", messageData.get("url"));
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pendingIntent;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) { pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_MUTABLE); }
        else { pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT); }

        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        String CHANNEL_ID = "0";

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
           NotificationChannel notificationChannel = new NotificationChannel(CHANNEL_ID, "Extreme-look", NotificationManager.IMPORTANCE_HIGH);
           notificationChannel.setDescription("messageBody");
           notificationChannel.setSound(defaultSoundUri, null);
           notificationChannel.enableLights(true);
           notificationChannel.setLightColor(Color.RED);
           notificationChannel.setVibrationPattern(new long[]{0, 1000, 500, 1000});
           notificationChannel.enableVibration(true);
           notificationManager.createNotificationChannel(notificationChannel);
        }

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, CHANNEL_ID);
        notificationBuilder
                .setAutoCancel(true)
                .setDefaults(Notification.DEFAULT_ALL)
                .setWhen(System.currentTimeMillis())
                .setSmallIcon(R.drawable.ic_notification)
                .setFullScreenIntent(pendingIntent, true)
                .setContentTitle(messageData.get("title"))
                .setContentText(messageData.get("body"))
                .setShowWhen(true)
                .setNumber(1)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);
        notificationManager.notify(1, notificationBuilder.build());
   }
}