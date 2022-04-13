import { useCallback, useState } from 'react';
import { Payment } from '../types/Payment';
import { PaymentByDate } from '../types/PaymentByDate';
import { useDateToString } from './useDateToString';

export const useMonthlyPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentsByDate, setPaymentsByDate] = useState<PaymentByDate[]>([]);
  const { getDateToString } = useDateToString();
  const getPaymentsJson = useCallback(
    (showingDate: Date) => {
      const firstDay = new Date(
        showingDate.getFullYear(),
        showingDate.getMonth(),
        1
      );
      const firstDayStr = getDateToString(firstDay);
      const lastDay = new Date(
        showingDate.getFullYear(),
        showingDate.getMonth() + 1,
        0
      );
      const lastDayStr = getDateToString(lastDay);
      fetch('./Payments.csv')
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          setPayments(
            convertPayments(data).filter(
              (payment) =>
                payment.date >= firstDayStr && payment.date <= lastDayStr
            )
          );
        });
    },
    []
  );
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

const convertPayments = (csvData: string) => {
  const rowArray = csvData.split('\n');
  const items = rowArray[0].split(',');
  const jsonArray = rowArray.map((rowa) => {
    const cellArray = rowa.split(',');
    let paypay = {} as Payment;
    if (typeof paypay.id == 'string') {
    }
    let line: object = {};
    items.forEach((item, index) => {
      if (isNumberValue(cellArray[index])) {
        line = { ...line, [item]: Number(cellArray[index]) };
      } else {
        line = { ...line, [item]: cellArray[index] };
      }
    });
    return line as Payment;
  });
  return jsonArray;
};

const isNumberValue = (n: any) => {
  return Number.isFinite(n) ? true : typeof n === 'string' && !isNaN(Number(n));
};
