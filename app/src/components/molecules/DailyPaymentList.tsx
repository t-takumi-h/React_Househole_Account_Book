import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Image, Text } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import { getCategoryIconSrc } from '../../service/getCategoryIcons';
import { Payment } from '../../types/Payment';

type Props = {
  pay: Payment;
  payIndex: number;
};
export const DailyPaymentList: VFC<Props> = memo((props) => {
  const { pay, payIndex } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      py="5px"
      borderBottom="1px"
      borderColor="gray.300"
      key={payIndex}
    >
      <Image boxSize="20px" src={getCategoryIconSrc(pay.category)} mx="5px" />
      <Text fontSize="sm" mx="5px">
        {pay.category}
      </Text>
      <Text fontSize="xs" flexGrow="1">
        ({pay.memo})
      </Text>
      <Text fontSize="sm" color={pay.type === 'income' ? 'blue' : 'black'}>
        {pay.price.toLocaleString()}円
      </Text>
      <ChevronRightIcon mr="5px" />
    </Box>
  );
});
