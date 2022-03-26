import { Payment } from "./Payment";

export type PaymentByDate = {
  date: Date;
  income: number;
  expense: number;
  sum: number;
  payments: Array<Payment>;
};