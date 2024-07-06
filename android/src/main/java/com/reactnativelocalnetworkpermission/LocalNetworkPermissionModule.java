package com.reactnativelocalnetworkpermission;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = LocalNetworkPermissionModule.NAME)
public class LocalNetworkPermissionModule extends ReactContextBaseJavaModule {
    public static final String NAME = "LocalNetworkPermission";

    public LocalNetworkPermissionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void check(int timeout, Promise promise) {
        promise.resolve(true);
    }
}
