import { useCallback, useState } from 'react';
import { Payment } from '../types/Payment';
import { PaymentByDate } from '../types/PaymentByDate';
import { useDateToString } from './useDateToString';

export const useMonthlyPayments = () => {
  const [payments, setPayments] = useState<Array<Payment>>([]);
  const [paymentsByDate, setPaymentsByDate] = useState<Array<PaymentByDate>>(
    []
  );
  const {getDateToString} = useDateToString();
  const getPaymentsJson = useCallback((showingDate: Date) => {
    const firstDay = new Date(showingDate.getFullYear(), showingDate.getMonth(),1);
    const firstDayStr = getDateToString(firstDay);
    const lastDay = new Date(showingDate.getFullYear(), showingDate.getMonth() + 1,0);
    const lastDayStr = getDateToString(lastDay);
    fetch('./Payments.csv')
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        setPayments(convertPayments(data).filter((payment) => payment.date >= firstDayStr && payment.date <= lastDayStr));
      });
  },[]);
  const getPaymentsByDate = useCallback((payments: Array<Payment>) => {
    const uniqueDates = Array.from(
      new Map(payments.map((payment) => [payment.date, payment.date])).keys()
    );
    let paymentsByDate = [] as Array<PaymentByDate>;
    uniqueDates.map((uniqueDate) => {
      const filteredPayments = payments.filter(
        (payment) => payment.date === uniqueDate
      );
      let incomeSum: number = 0;
      let expenseSum: number = 0;
      filteredPayments.forEach((filteredPayment) => {
        if (filteredPayment.type === 'income') {
          incomeSum = incomeSum + filteredPayment.price;
        } else {
          expenseSum = expenseSum + filteredPayment.price;
        }
      });
      var sum: number = incomeSum - expenseSum;
      const paymentByDate: PaymentByDate = {
        date: new Date(uniqueDate),
        income: incomeSum,
        expense: expenseSum,
        sum: sum,
        payments: filteredPayments,
      };
      paymentsByDate.push(paymentByDate);
    });
    setPaymentsByDate(paymentsByDate);
  },[]);
  return { getPaymentsJson, getPaymentsByDate, payments, paymentsByDate };
};

const convertPayments = (csvData: string) => {
  let jsonArray = [] as Array<Payment>;
  let rowArray = csvData.split('\n');
  let items = rowArray[0].split(',');
  for (let i = 1; i < rowArray.length; i++) {
    let cellArray = rowArray[i].split(',');
    let line: object = {};
    let paypay = {} as Payment;
    if (typeof paypay.id == 'string') {
    }
    items.forEach((item, index) => {
      if (isNumberValue(cellArray[index])) {
        line = { ...line, [item]: Number(cellArray[index]) };
        
      } else {
        line = { ...line, [item]: cellArray[index] };
      }
    });
    const pay: Payment = line as Payment;
    jsonArray.push(pay);
  }
  return jsonArray;
};

const isNumberValue = (n: any) => {
  return Number.isFinite(n) ? true : typeof n === 'string' && !isNaN(Number(n));
};

