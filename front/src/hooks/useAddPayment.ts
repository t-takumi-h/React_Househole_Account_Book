import { ulid } from 'ulid';

export const useAddPayment = () => {
  const addPayment = (
    addDate: string,
    addPayment: number,
    addMemo: string,
    addCategory: string
  ) => {
    const addData = {
      id: ulid(),
      date: addDate,
      type: 'expense',
      category: addCategory,
      memo: addMemo,
      price: addPayment,
    };
  };

  return { addPayment };
};
