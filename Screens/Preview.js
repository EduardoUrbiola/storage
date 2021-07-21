import React, { useState } from 'react';
import formHooks from '../components/forms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Text,
  Input,
  Box,
  Center,
  VStack,
  Button,
  HStack,
  AspectRatio,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';
const Preview = ({ navigation }) => {
  const { Controller, control, errors, handleSubmit } = formHooks();

  const onSubmit = (data) => {
    return navigation.navigate('Chat', { message: data.message });
  };

  return (
    <>
      <ScrollView height={'auto'}>
        <AspectRatio ratio={16 / 9}>
          <Image
            roundedTop="lg"
            source={{
              uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
            }}
            alt="image"
          />
        </AspectRatio>
        <Center>
          <HStack space={5}>
            <Text fontSize="2xl" color="white" bold>
              Rexborg. Idoho
            </Text>
            <Text fontSize="2xl" color="green.500" bold>
              $50
            </Text>
          </HStack>
        </Center>
        <Box>
          <HStack mt={20}>
            <Center bg="transparent" width={'100%'} height={'50%'}>
              <HStack alignItems="center" justifyContent="center" space={4}>
                <Image
                  width={60}
                  height={60}
                  alt="image"
                  source={require(// @ts-ignore
                  '../assets/icon-36.png')}
                />
                <Text fontSize="2xl" fontWeight="400" color="white">
                  Sharon Clement
                </Text>
              </HStack>
            </Center>
          </HStack>
        </Box>
      </ScrollView>
      <KeyboardAvoidingView behavior="height">
        {errors.message && (
          <Text fontSize="xs" alignSelf="center" color="red.400">
            Cannot send blank message
          </Text>
        )}
        <HStack space={3} alignItems="center" justifyContent="center" width={'100%'}>
          <Center width={'80%'}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  color={'#111827'}
                  bg={'white'}
                  variant="outline"
                  placeholder="type message..."
                  width="95%"
                />
              )}
              name="message"
              defaultValue=""
            />
          </Center>

          <Button variant="outline" onPress={handleSubmit(onSubmit)}>
            <MaterialCommunityIcons name="email-send" size={30} color="aliceblue" />
          </Button>
        </HStack>
      </KeyboardAvoidingView>
    </>
  );
};

export default Preview;
