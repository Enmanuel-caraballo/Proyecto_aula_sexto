package com.example.app;

import android.os.Build;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.google.android.gms.wallet.IsReadyToPayRequest;
import com.google.android.gms.wallet.WalletConstants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Optional;

public class PaymentsUtil {

  private static final String PAYMENTS_API_VERSION = "2";
  private static final String PAYMENTS_API_VERSION_MINOR = "0";

  /** Tarjetas soportadas: Visa, Mastercard */
  private static final JSONArray ALLOWED_CARD_NETWORKS = new JSONArray()
    .put("VISA")
    .put("MASTERCARD");

  /** Métodos de autenticación soportados */
  private static final JSONArray ALLOWED_CARD_AUTH_METHODS = new JSONArray()
    .put("PAN_ONLY")
    .put("CRYPTOGRAM_3DS");

  /** Construye el objeto JSON base */
  private static JSONObject getBaseRequest() throws JSONException {
    return new JSONObject()
      .put("apiVersion", Integer.valueOf(PAYMENTS_API_VERSION))
      .put("apiVersionMinor", Integer.valueOf(PAYMENTS_API_VERSION_MINOR));
  }

  /** Tipo de tarjeta aceptada */
  private static JSONObject getCardPaymentMethod() throws JSONException {
    JSONObject cardPaymentMethod = new JSONObject()
      .put("type", "CARD");

    JSONObject parameters = new JSONObject()
      .put("allowedAuthMethods", ALLOWED_CARD_AUTH_METHODS)
      .put("allowedCardNetworks", ALLOWED_CARD_NETWORKS)
      .put("billingAddressRequired", true)
      .put("billingAddressParameters", new JSONObject()
          .put("format", "FULL"));

    cardPaymentMethod.put("parameters", parameters);

    return cardPaymentMethod;
  }

  /** Construye el request para isReadyToPay() */

  @Nullable
  public static JSONObject getIsReadyToPayRequest() {
    try {
      JSONObject request = getBaseRequest();
      JSONArray allowedPaymentMethods = new JSONArray().put(getCardPaymentMethod());
      request.put("allowedPaymentMethods", allowedPaymentMethods);
      return request;
    } catch (JSONException e) {
      e.printStackTrace();
      return null;
    }
  }

  @Nullable
  public static JSONObject getPaymentDataRequest(int priceCents, String description) {
    try {
      JSONObject paymentDataRequest = getBaseRequest();

      paymentDataRequest.put(
        "allowedPaymentMethods",
        new JSONArray().put(getCardPaymentMethodWithTokenization())
      );

      JSONObject transactionInfo = new JSONObject()
        .put("totalPrice", String.format("%.2f", priceCents /100.00))
        .put("totalPriceStatus", "FINAL")
        .put("currencyCode", "COP");

      paymentDataRequest.put("transactionInfo", transactionInfo);
      paymentDataRequest.put("merchantInfo", new JSONObject().put("merchantName", description));

      return paymentDataRequest;

    } catch (JSONException e) {
      e.printStackTrace();
      return null;
    }
  }

  private static JSONObject getTokenizationSpecification() throws JSONException {
    return new JSONObject()
      .put("type", "PAYMENT_GATEWAY")
      .put(
        "parameters",
        new JSONObject()
          .put("gateway", "example")
          .put("gatewayMerchantId", "exampleMerchantId")
      );
  }

  private static JSONObject getCardPaymentMethodWithTokenization() throws JSONException {
    JSONObject cardPaymentMethod = getCardPaymentMethod();
    cardPaymentMethod.put("tokenizationSpecification", getTokenizationSpecification());
    return cardPaymentMethod;
  }


}

