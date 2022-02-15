import React from 'react';
import formHooks from '../components/forms';
import { Text, Input, Box, Center, VStack, Button } from 'native-base';

const Find = ({navigation}) => {
  const { Controller, control, errors, handleSubmit } = formHooks();

  const search = (data) => {
    console.log(data);
    navigation.navigate("Result")
  };

  return (
    <VStack space={2} alignContent={'center'}>
      <Box>
        <Center my={25}>
          <Controller
            control={control}
            rules={{
              // required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                color={'white'}
                variant="underlined"
                placeholder="Search..."
                width="80%"
              />
            )}
            name="search"
            defaultValue=""
          />
          {errors.search && <Text sub fontSize="md" color="red">This is required.</Text>}
        </Center>
      </Box>
      <Button my={-5} width={'60%'} alignSelf="center"  rounded={12} onPress={handleSubmit(search)}>
        Search
      </Button>
    </VStack>
  );
};

export default Find;
