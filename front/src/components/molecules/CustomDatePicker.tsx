import { memo, VFC } from "react";
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import { Box, Button, Select } from "@chakra-ui/react";
registerLocale('ja', ja);

type Props = {
  addedDate: Date;
  onChangeDate: (date: Date) => void;
};

export const CustomDatePicker: VFC<Props> = memo((props) => {

  const {addedDate, onChangeDate} = props;

  const years: number[] = Array.from(Array(100), (v, k) => k + 2000);

  const months: number[] = Array.from(Array(12), (v, k) => k + 1);

  return (
    <DatePicker
                  locale="ja"
                  selected={addedDate}
                  onChange={onChangeDate}
                  placeholderText="日付を選択してください"
                  dateFormat="yyyy年M月d日(E)"
                  showMonthDropdown
                  showYearDropdown
                  todayButton="今日"
                  dropdownMode="select"
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <Box m="10px" display="flex" justifyContent="center">
                      <Button
                        size="xs"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {'<'}
                      </Button>
                      <Select
                        size="xs"
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) =>
                          changeYear(Number(value))
                        }
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}年
                          </option>
                        ))}
                      </Select>

                      <Select
                        size="xs"
                        value={months[date.getMonth()]}
                        onChange={({ target: { value } }) =>
                          changeMonth(Number(value))
                        }
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}月
                          </option>
                        ))}
                      </Select>
                      <Button
                        size="xs"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {'>'}
                      </Button>
                    </Box>
                  )}
                />
  );
})



