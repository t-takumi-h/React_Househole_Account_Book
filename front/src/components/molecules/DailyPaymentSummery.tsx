import { Box, Text } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import { useDateToString } from '../../hooks/useDateToString';
import { PaymentByDate } from '../../types/PaymentByDate';

type Props = {
  payDate: PaymentByDate;
};

export const DailyPaymentSummery: VFC<Props> = memo((props) => {
  const { payDate } = props;
  const { getDateToJapaneseString } = useDateToString();
  return (
    <Box
      bg="blue.50"
      display="flex"
      alignItems="center"
      py="2px"
      borderBottom="1px"
      borderColor="gray.300"
    >
      <Text fontSize="xs" flexGrow="1" ml="10px">
        {getDateToJapaneseString(payDate.date)}
      </Text>
      <Text fontSize="xs" alignItems="flex-end" mr="10px">
        {payDate.sum.toLocaleString()}円
      </Text>
    </Box>
  );
});
