import z from "zod";

export const initiatePaymentSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0."),
  purpose: z.string().optional(),
});