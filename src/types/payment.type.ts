
export interface InitiatePaymentPayload {
  amount: number;
  purpose?: string;
}

export interface InitiatePaymentResponseData {
  paymentId: string;
  bkashPaymentID: string;
  bkashURL: string;
  amount: number;
  merchantInvoiceNumber: string;
}


export interface PaymentCallbackPayload {
  paymentID: string;
}