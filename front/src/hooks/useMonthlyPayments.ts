import axios from 'axios';
import { useCallback, useState } from 'react';
import { Payment } from '../types/Payment';
import { PaymentByDate } from '../types/PaymentByDate';
import { useDateToString } from './useDateToString';

export const useMonthlyPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentsByDate, setPaymentsByDate] = useState<PaymentByDate[]>([]);
  const { getYearMonthToString } = useDateToString();
  const getPaymentsJson = useCallback((showingDate: Date) => {
    const showingYearMonth = getYearMonthToString(showingDate);
    axios
      .post<Array<Payment>>(
        'http://localhost:8080/api/v1/payment/find-by-year-month',
        {
          yearMonth: showingYearMonth,
        }
      )
      .then((res) => {
        setPayments(res.data);
      })
      .catch(() => {
        //エラー時
      });
  }, []);
  const getPaymentsByDate = useCallback((payments: Payment[]) => {
    const uniqueDates = Array.from(
      new Map(payments.map((payment) => [payment.date, payment.date])).keys()
    );
    const paymentsByDate = uniqueDates.map((uniqueDate) => {
      const filteredPayments = payments.filter(
        (payment) => payment.date === uniqueDate
      );
      let incomeSum = 0;
      let expenseSum = 0;
      filteredPayments.forEach((filteredPayment) => {
        if (filteredPayment.type === 'income') {
          incomeSum = incomeSum + filteredPayment.price;
        } else {
          expenseSum = expenseSum + filteredPayment.price;
        }
      });
      return {
        date: new Date(uniqueDate),
        income: incomeSum,
        expense: expenseSum,
        sum: incomeSum - expenseSum,
        payments: filteredPayments,
      };
    });
    setPaymentsByDate(paymentsByDate);
  }, []);
  return { getPaymentsJson, getPaymentsByDate, payments, paymentsByDate };
};
