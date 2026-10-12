import apiClient from "@/lib/apiClient";
import type {
  ApiEnvelope,
  InitiatePaymentPayload,
  InitiatePaymentResponseData,
  PaymentCallbackPayload,
} from "@/types";

export function initiatePayment(payload: InitiatePaymentPayload) {
  return apiClient<ApiEnvelope<InitiatePaymentResponseData>>(
    "/payments/initiate",
    { method: "POST", body: payload },
  );
}

export function getPayment(id: string) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>(`/payments/${id}`);
}



export function confirmPaymentSuccess(payload: PaymentCallbackPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/payments/success", {
    method: "POST",
    body: payload,
  });
}

export function confirmPaymentFail(payload: PaymentCallbackPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/payments/fail", {
    method: "POST",
    body: payload,
  });
}

export function confirmPaymentCancel(payload: PaymentCallbackPayload) {
  return apiClient<ApiEnvelope<Record<string, unknown>>>("/payments/cancel", {
    method: "POST",
    body: payload,
  });
}