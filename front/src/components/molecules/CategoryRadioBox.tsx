import {
  Box,
  HStack,
  Image,
  Text,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { StringOrNumber } from '@chakra-ui/utils';
import React, { memo, VFC, useEffect, useState } from 'react';
import { getCategoryIconSrc } from '../../service/getCategoryIcons';

type Props = {
  setAddedCategory: React.Dispatch<React.SetStateAction<StringOrNumber>>;
  options: string[];
  categoryName: string;
};

export const CategoryRadioBox: VFC<Props> = memo((props) => {
  const { setAddedCategory, options, categoryName} = props;
  const { getRootProps, getRadioProps, value, setValue } = useRadioGroup({
    name: categoryName,
    defaultValue: options[0],
  });
  const group = getRootProps();
  useEffect(() => setValue(options[0]),[options[0]])
  useEffect(() => setAddedCategory(value), [value]);
  
  console.log(value);


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
