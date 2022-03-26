import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Center, Image, Text } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import { useCategoryIcons } from '../../hooks/useCategoryIcons';
import { useDateToString } from '../../hooks/useDateToString';
import { PaymentByDate } from '../../types/PaymentByDate';
import { DailyPaymentList } from '../molecules/DailyPaymentList';
import { DailyPaymentSummery } from '../molecules/DailyPaymentSummery';

type Props = {
  reversedPaymentsByDate: PaymentByDate[];
};

export const PaymentList: VFC<Props> = memo((props) => {
  const { reversedPaymentsByDate } = props;
  return (
    <Center>
      <Box w="500px">
        {reversedPaymentsByDate.map((payDate, payDateIndex) => (
          <Box key={payDateIndex}>
            <DailyPaymentSummery payDate={payDate} />
            {payDate.payments.map((pay, payIndex) => (
              <DailyPaymentList pay={pay} payIndex={payIndex} />
            ))}
          </Box>
        ))}
      </Box>
    </Center>
  );
});
