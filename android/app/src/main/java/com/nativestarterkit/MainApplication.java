package com.nativestarterkit;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.remobile.toast.RCTToastPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
<<<<<<< HEAD
            new RCTToastPackage(),
            new ReactNativeIcons(),
            new FBSDKPackage(),
            new FacebookLoginPackage(),
            new CodePush(null, MainApplication.this, BuildConfig.DEBUG),
            new VectorIconsPackage()
=======
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG)
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG)
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
