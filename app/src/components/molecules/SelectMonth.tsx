import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import { memo, VFC } from 'react';

type Props = {
  showingDate: Date;
  onClickPrevious: () => void;
  onClickNext: () => void;
};

export const SelectMonth: VFC<Props> = memo((props) => {
  const { showingDate, onClickPrevious, onClickNext } = props;
  return (
    <Box display="flex" alignItems="center" justifyContent="center" py="5px">
      <ChevronLeftIcon onClick={onClickPrevious} cursor="pointer" />
      <Text fontSize="lg" w="150px" textAlign="center">
        {showingDate.getFullYear()}年{showingDate.getMonth() + 1}月
      </Text>
      <ChevronRightIcon onClick={onClickNext} cursor="pointer" />
    </Box>
  );
});
