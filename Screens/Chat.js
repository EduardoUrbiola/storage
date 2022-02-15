import React, { useEffect } from 'react';
import formHooks from '../components/forms';
import {
  Text,
  Input,
  Image,
  Box,
  Center,
  VStack,
  Button,
  ScrollView,
  HStack,
  KeyboardAvoidingView,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import ChatMessage from '../components/ChatMessage';

const Chat = ({
  navigation,
  Me,
  route: {
    params: { message },
  },
}) => {
  const { Controller, control, errors, handleSubmit } = formHooks();
  const { height } = Dimensions.get('window');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Box>
            <HStack alignItems="center" space={4}>
              <Image
                width={55}
                height={55}
                alt="image"
                source={require(// @ts-ignore
                '../assets/icon-36.png')}
              />
              <Text fontSize="2xl" bold color="aliceblue">
                Sharon Clement
              </Text>
            </HStack>
          </Box>
        );
      },
    });
    return () => {};
  }, []);

  return (
    <>
      <ScrollView>
        <VStack mt={2} width={"100%"}>
          {Me ? (
            <HStack
              bg={'green.100'}
              maxWidth={'70%'}
              mr={1}
              position="relative"
              right={0}
              borderTopLeftRadius={12}
              borderBottomRadius={5}
              justifyContent="flex-end"
              alignSelf="flex-end"
            >
              <ChatMessage message={message} />
            </HStack>
          ) : (
            <HStack
              bg={'yellow.100'}
              maxWidth={'70%'}
              ml={1}
              borderTopRightRadius={12}
              borderBottomRadius={5}
            >
              <ChatMessage message={message} />
            </HStack>
          )}
        </VStack>
      </ScrollView>
      <KeyboardAvoidingView behavior="height" >
        <HStack space={3} justifyContent="center" width={'100%'}>
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
                  placeholder="Type message..."
                  width="95%"
                />
              )}
              name="message"
              defaultValue=""
            />
            {errors.message && (
              <Text sub color="red.100">
                Cannot send blank message
              </Text>
            )}
          </Center>
          <Button variant="outline" onPress={() => navigation.navigate('Chat')}>
            <MaterialCommunityIcons name="email-send" size={30} color="aliceblue" />
          </Button>
        </HStack>
      </KeyboardAvoidingView>
    </>
  );
};

export default Chat;
