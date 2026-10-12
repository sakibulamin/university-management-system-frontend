import {
  confirmPaymentCancel,
  confirmPaymentFail,
  confirmPaymentSuccess,
  getPayment,
  initiatePayment,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const paymentKeys = {
  detail: (id: string) => ["payments", "detail", id] as const,
};

export function useInitiatePayment() {
  return useMutation({
    mutationFn: initiatePayment,
  });
}

// Only meaningful once a real payment id is known — there is no
// confirmed list/history endpoint, so no usePayments() list hook exists.
export function usePayment(id: string) {
  return useQuery({
    queryKey: paymentKeys.detail(id),
    queryFn: () => getPayment(id),
    enabled: !!id,
  });
}

// Used only by payment-callback-handler.tsx, with bKash's own paymentID
// obtained from the real callback redirect.
export function useConfirmPaymentSuccess() {
  return useMutation({
    mutationFn: confirmPaymentSuccess,
  });
}

export function useConfirmPaymentFail() {
  return useMutation({
    mutationFn: confirmPaymentFail,
  });
}

export function useConfirmPaymentCancel() {
  return useMutation({
    mutationFn: confirmPaymentCancel,
  });
}
