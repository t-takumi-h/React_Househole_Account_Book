import { Box, HStack, Image, Text, useRadio } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import { getCategoryIconSrc } from '../../service/getCategoryIcons';

type Props = {
  options: string[];
  getRootProps: any;
  getRadioProps: any;
};

export const CategoryRadioBox: VFC<Props> = memo((props) => {
  const { options, getRootProps, getRadioProps } = props;
  const group = getRootProps();
  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            <Box display="table-cell" verticalAlign="middle">
              <Image boxSize="30px" src={getCategoryIconSrc(value)} m="auto" />
              <Text>{value}</Text>
            </Box>
          </RadioCard>
        );
      })}
    </HStack>
  );
});

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
