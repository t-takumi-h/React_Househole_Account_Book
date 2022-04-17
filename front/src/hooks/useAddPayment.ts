import axios from 'axios';
import { ResultDto } from '../types/ResultDto';

export const useAddPayment = () => {
  const addPayment = (
    addDate: string,
    addPayment: number,
    addMemo: string,
    addCategory: string
  ) => {
    const addData = {
      date: addDate,
      type: 'expense',
      category: addCategory,
      memo: addMemo,
      price: addPayment,
    };
    axios.post<ResultDto>(
      'http://localhost:8080/api/v1/payment/add',
      addData
    ).then((res) => {
      console.log(res.data.result);
    })
  };

  return { addPayment };
};
