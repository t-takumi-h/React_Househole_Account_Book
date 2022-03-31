import {
  background,
  border,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Text,
  useDisclosure,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';

import { ChangeEvent, forwardRef, useEffect, useState } from 'react';

import { useMonthlyPayments } from '../../hooks/useMonthlyPayments';
import { SelectMonth } from '../molecules/SelectMonth';
import { PaymentList } from '../organisms/PaymentList';
import { useCategoryIcons } from '../../hooks/useCategoryIcons';
import { useAddPayment } from '../../hooks/useAddPayment';
import { useDateToString } from '../../hooks/useDateToString';

registerLocale('ja', ja);

export const Calendar = () => {
  const { getPaymentsJson, getPaymentsByDate, payments, paymentsByDate } =
    useMonthlyPayments();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {addPayment} = useAddPayment();
  const {getDateToString} = useDateToString();

  const reversedPaymentsByDate = [...paymentsByDate].reverse();
  const currentDate = new Date();
  // TODO: selectmonthコンポーネントで呼べるようにshowingDateをhooks化した方がいいかも？
  const [showingDate, setShowingDate] = useState<Date>(currentDate);

  useEffect(() => getPaymentsJson(showingDate), [getPaymentsJson, showingDate]);
  useEffect(() => getPaymentsByDate(payments), [getPaymentsByDate, payments]);

  const onClickPrevious = () => {
    const nextDate = new Date(
      showingDate.getFullYear(),
      showingDate.getMonth() - 1
    );
    setShowingDate(nextDate);
  };

  const onClickNext = () => {
    const nextDate = new Date(
      showingDate.getFullYear(),
      showingDate.getMonth() + 1
    );
    setShowingDate(nextDate);
  };

  const onClickInput = () => {
    onOpen();
  };

  const [addedDate, setAddedDate] = useState<Date>(showingDate);

  

  const onChangeDate = (date: Date) => {
    setAddedDate(date);
  };

  const [addedPaymentValue, setAddedPaymentValue] = useState<number>(0);

  const onChangePaymentValue = (paymentValue:string) => {
    setAddedPaymentValue(Number(paymentValue))
  }
  const [addedPaymentMemo, setAddedPaymentMemo] = useState<string>("");

  const onChangePaymentMemo = (e:ChangeEvent<HTMLInputElement>) => {
    setAddedPaymentMemo(e.target.value)
  }

  

  const years: number[] = Array.from(Array(100), (v, k) => k + 2000);

  const months: number[] = Array.from(Array(12), (v, k) => k + 1);

  const options = ['住居費', '食費', '被服費'];

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: 'Category',
    defaultValue: options[0],
    //onChange: console.log,
  });

  const group = getRootProps();

  const { getCategoryIconSrc } = useCategoryIcons();

  const onClickAdd = () => {
    addPayment(getDateToString(addedDate),addedPaymentValue,addedPaymentMemo,value.toString());    
  }

  console.log(addedDate, addedPaymentValue, addedPaymentMemo, value);

  return (
    <>
      <Heading fontSize="lg" textAlign="center">
        カレンダー
      </Heading>
      <SelectMonth
        showingDate={showingDate}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />
      <Button onClick={onClickInput}>入力</Button>
      <PaymentList reversedPaymentsByDate={reversedPaymentsByDate} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>入力</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl display="flex">
                <FormLabel w="50px">日付</FormLabel>
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
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel w="50px">金額</FormLabel>
                <NumberInput size="md" defaultValue={0} onChange={onChangePaymentValue}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel w="50px">メモ</FormLabel>
                <Input size="md" placeholder="未入力" onChange={onChangePaymentMemo}/>
              </FormControl>
              <FormControl>
                <FormLabel>カテゴリー</FormLabel>
                <HStack {...group}>
                  {options.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        <Box display="table-cell" verticalAlign="middle">
                          <Image
                            boxSize="30px"
                            src={getCategoryIconSrc(value)}
                            m="auto"
                          />
                          <Text>{value}</Text>
                        </Box>
                      </RadioCard>
                    );
                  })}
                </HStack>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClickAdd}>追加</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          borderColor: 'teal.600',
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
        w="110px"
        h="80px"
        textAlign="center"
        display="table"
      >
        {props.children}
      </Box>
    </Box>
  );
}
