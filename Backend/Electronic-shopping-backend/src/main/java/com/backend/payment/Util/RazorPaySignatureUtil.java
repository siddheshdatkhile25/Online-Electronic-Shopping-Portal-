package com.backend.payment.Util;


import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class RazorPaySignatureUtil {

    public static boolean verify(
            String orderId,
            String paymentId,
            String razorpaySignature,
            String secret
    ) throws Exception {

        String payload = orderId + "|" + paymentId;

        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey =
                new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

        mac.init(secretKey);
        byte[] digest = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));

        String generatedSignature = bytesToHex(digest);
        return generatedSignature.equals(razorpaySignature);
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hex = new StringBuilder();
        for (byte b : hash) {
            hex.append(String.format("%02x", b));
        }
        return hex.toString();
    }
}

