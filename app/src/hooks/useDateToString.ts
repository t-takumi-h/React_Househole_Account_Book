export const useDateToString = () => {
  const getDateToJapaneseString = (date: Date) => {
    const dateToString: string =
      date.getFullYear() +
      '年' +
      (date.getMonth() + 1) +
      '月' +
      date.getDate() +
      '日(' +
      getDayToString(date) + ')';
    return dateToString;
  };
  const getDateToString = (date: Date) => {
    const dateToString: string = date.getFullYear() + "-" + addZero(date.getMonth()+1) + "-" + addZero(date.getDate())
    return dateToString;
  }
  return {getDateToJapaneseString, getDateToString}
};

const getDayToString = (date: Date) => {
  switch (date.getDay()) {
    case 0:
      return '日';
    case 1:
      return '月';
    case 2:
      return '火';
    case 3:
      return '水';
    case 4:
      return '木';
    case 5:
      return '金';
    case 6:
      return '土';
    default:
      throw new RangeError('曜日が判定できませんでした。');
  }
};

const addZero = (n: number) => {
  if(n >= 10){
    return n.toString();
  }else{
    return ('0' + n.toString());
  }
}
