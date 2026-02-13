package ru.extreme_look_app.extremelook;

import android.app.Application;

import com.yandex.metrica.YandexMetrica;
import com.yandex.metrica.YandexMetricaConfig;

public class EX_YandexMetrica extends Application {
    @Override
    public void onCreate() {

        super.onCreate();

        YandexMetricaConfig EX_appMetricaConfig = YandexMetricaConfig.newConfigBuilder("-----//-----")
                .withLogs()
                .build();
        YandexMetrica.activate(this, EX_appMetricaConfig);
        YandexMetrica.enableActivityAutoTracking(this);
    }
}