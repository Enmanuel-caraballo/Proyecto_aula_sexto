package com.example.app;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginConfig;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.IsReadyToPayRequest;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.PaymentDataRequest;
import com.google.android.gms.wallet.PaymentsClient;
import com.google.android.gms.wallet.Wallet;
import com.google.android.gms.wallet.WalletConstants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Optional;

@CapacitorPlugin(name = "GooglePayPlugin")
public class GooglePayPlugin extends Plugin {



  private PaymentsClient paymentsClient;

  private static final int LOAD_PAYMENT_DATA_REQUEST_CODE = 991;


  @Override
  public void load() {
    paymentsClient = createPaymentsClient(getContext());
  }

  public static  final String CAPACITOR_SHARED_PREFERENCES_NAME = "CapacitorStorage";
  @PluginMethod()
  public void makePayment(PluginCall call) throws JSONException {

    String itemJson =getContext()
      .getSharedPreferences(CAPACITOR_SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE)
      .getString("product", "none");


     if(itemJson.equals("none")){
       call.reject("Any product");
       return;
     }

     JSONObject product = new JSONObject(itemJson);
     String description = product.getString("description");
     int price = product.getInt("price");

     JSONObject paymentDataRequestJson =
       PaymentsUtil.getPaymentDataRequest(price, description);

     if(paymentDataRequestJson == null){
       call.reject("No se pudo crear PaymentDataRequest");
       return;
     }

    PaymentDataRequest request =
      PaymentDataRequest.fromJson(paymentDataRequestJson.toString());





    AutoResolveHelper.resolveTask(
      paymentsClient.loadPaymentData(request),
      getActivity(),
      LOAD_PAYMENT_DATA_REQUEST_CODE
    );

    this.saveCall(call);

    System.out.println(description);
    System.out.println(price);


  }

  @Override
  protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) throws JSONException {
    super.handleOnActivityResult(requestCode, resultCode, data);

    if(requestCode == LOAD_PAYMENT_DATA_REQUEST_CODE){
      if(resultCode == Activity.RESULT_OK){
        PaymentData paymentData = PaymentData.getFromIntent(data);
        if(paymentData != null){

          JSONObject paymentDataJson = new JSONObject(paymentData.toJson());
          String token = paymentDataJson
            .getJSONObject("paymentMethodData")
            .getJSONObject("tokenizationData")
            .getString("token");

          JSObject result = new JSObject();
          result.put("token", token);

          savedLastCall.resolve(result);

        }
      }else{
        savedLastCall.reject("Pago cancelado o fallido");
      }
    }
  }


  private static JSONObject getBaseRequest() throws JSONException {
    return new JSONObject().put("apiVersion", 2).put("apiVersionMinor", 0);
  }

  public static PaymentsClient createPaymentsClient(Context context) {
    Wallet.WalletOptions walletOptions =
      new Wallet.WalletOptions.Builder().setEnvironment(WalletConstants.ENVIRONMENT_TEST).build();
    return Wallet.getPaymentsClient(context, walletOptions);
  }


}
