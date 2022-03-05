package com.cordova.plugin.example;

import org.apache.cordova.*;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


public class CordovaPluginExample extends CordovaPlugin {

  private final String TAG = "CordovaPluginExample";
  private OkHttpClient http;
  private WriteFileHelper writeFileHelper;

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    Log.d(TAG, "Initializing Cordova plugin example");
    super.initialize(cordova, webView);
    http = new OkHttpClient();
    writeFileHelper = new WriteFileHelper(this);
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals("greeting")) {
      greeting(callbackContext, args);
      return true;
    }
    if (action.equals("countdownTimer")) {
      countdownTimer(callbackContext, args);
      return true;
    }
    if (action.equals("writeFile")) {
      writeFile(callbackContext, args);
      return true;
    }
    if (action.equals("bitcoinCurrentPrice")) {
      bitcoinCurrentPrice(callbackContext);
      return true;
    }
    return false;
  }

  private void greeting(final CallbackContext callbackContext, final JSONArray args) throws JSONException {
    String response = (args.isNull(0))
      ? "Hello!"
      : "Hello " + args.getString(0) + "!";
    callbackContext.success(response);
  }

  private void countdownTimer(final CallbackContext callbackContext, final JSONArray args) throws JSONException {
    final Integer seconds = (!args.isNull(0) && args.getInt(0) > 0)
      ? args.getInt(0)
      : 10;

    Handler handler = new Handler(Looper.getMainLooper());

    Runnable runnable = new Runnable() {
      Integer secondsLeft = seconds;

      @Override
      public void run() {
        boolean keepCallback = secondsLeft > 0;
        final PluginResult result = new PluginResult(PluginResult.Status.OK, secondsLeft);
        result.setKeepCallback(keepCallback);
        callbackContext.sendPluginResult(result);
        if (keepCallback) {
          secondsLeft--;
          handler.postDelayed(this, 1000);
        } else {
          handler.removeCallbacks(this);
        }
      }

    };

    handler.postDelayed(runnable, 0);
  }

  private void writeFile(final CallbackContext callbackContext, final JSONArray args) throws JSONException {
    writeFileHelper.writeFile(callbackContext, args);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == WriteFileHelper.CREATE_FILE_CODE) {
      writeFileHelper.onCreateFileActivityResult(resultCode, data);
    }
  }

  private void bitcoinCurrentPrice(final CallbackContext callbackContext) {
    Request request = new Request.Builder()
      .url("https://api.coindesk.com/v1/bpi/currentprice.json")
      .build();

    try (Response response = http.newCall(request).execute()) {
      JSONObject jsonObject = new JSONObject(response.body().string());
      callbackContext.success(jsonObject);
    } catch (IOException | JSONException e) {
      Log.e(TAG, e.getMessage());
      e.printStackTrace();
      callbackContext.error("REQUEST_ERROR");
    }
  }

}
