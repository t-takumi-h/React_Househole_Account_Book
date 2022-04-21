import {
  Button,
  FormControl,
  FormLabel,
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
  RadioGroup,
  Radio,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, memo, useState, VFC } from 'react';
import { StringOrNumber } from '@chakra-ui/utils';

import { useAddPayment } from '../../hooks/useAddPayment';
import { useDateToString } from '../../hooks/useDateToString';
import { CategoryRadioBox } from '../molecules/CategoryRadioBox';
import { CustomDatePicker } from '../molecules/CustomDatePicker';

type Props = {
  showingDate: Date;
};

export const PaymentInputModal: VFC<Props> = memo((props) => {
  const { showingDate } = props;

  const { addPayment } = useAddPayment();
  const { getDateToString } = useDateToString();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addedDate, setAddedDate] = useState<Date>(showingDate);
  const [addedCategory, setAddedCategory] = useState<StringOrNumber>('');

  const onChangeDate = (date: Date) => {
    setAddedDate(date);
  };

  const [addedPaymentValue, setAddedPaymentValue] = useState<number>(0);

  const onChangePaymentValue = (paymentValue: string) => {
    setAddedPaymentValue(Number(paymentValue));
  };
  const [addedPaymentMemo, setAddedPaymentMemo] = useState<string>('');

  const onChangePaymentMemo = (e: ChangeEvent<HTMLInputElement>) => {
    setAddedPaymentMemo(e.target.value);
  };

  const [typeValue, setTypeValue] = useState('expense');

  const options =
    typeValue === 'expense' ? ['住居費', '食費', '被服費'] : ['給料'];
  const expenseOptions = ['住居費', '食費', '被服費'];
  const incomeOptions = ['給料'];

  const onClickAdd = () => {
    addPayment(
      getDateToString(addedDate),
      typeValue,
      addedPaymentValue,
      addedPaymentMemo,
      addedCategory.toString()
    );
  };

  const onClickInput = () => {
    onOpen();
  };

  return (
    <>
      <Button onClick={onClickInput}>入力</Button>
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
              <FormControl>
                <RadioGroup onChange={setTypeValue} value={typeValue}>
                  <Stack direction="row">
                    <Radio value="expense">支出</Radio>
                    <Radio value="income">収入</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl display="flex">
                <FormLabel w="50px">日付</FormLabel>
                <CustomDatePicker
                  addedDate={addedDate}
                  onChangeDate={onChangeDate}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                {typeValue === 'expense' ? (
                  <FormLabel w="50px">支出</FormLabel>
                ) : (
                  <FormLabel w="50px">収入</FormLabel>
                )}
                <NumberInput
                  size="md"
                  defaultValue={0}
                  onChange={onChangePaymentValue}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel w="50px">メモ</FormLabel>
                <Input
                  size="md"
                  placeholder="未入力"
                  onChange={onChangePaymentMemo}
                />
              </FormControl>
              <FormControl>
                <FormLabel>カテゴリー</FormLabel>
                  <CategoryRadioBox
                    setAddedCategory={setAddedCategory}
                    options={ typeValue === 'expense'? expenseOptions : incomeOptions}
                    categoryName={ typeValue }
                  />
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
});
