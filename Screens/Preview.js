import React from "react";
import formHooks from "../components/forms";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  Input,
  Box,
  Center,
  Button,
  HStack,
  AspectRatio,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native";
const Preview = ({ navigation, route: { params } }) => {
  const { Controller, control, errors, handleSubmit } = formHooks();

  const { image, amount, description, user, name } = params;

  const onSubmit = (data) => {
    return navigation.navigate("Chat", { message: data.message });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView height={"auto"}>
        <AspectRatio ratio={16 / 9}>
          <Image
            roundedTop="lg"
            source={{
              uri: image,
            }}
            alt="image"
          />
        </AspectRatio>
        <Center p={3}>
          <HStack space={5}>
            <Text fontSize="xl" color="white" bold>
              {description}
            </Text>
            <Text fontSize="2xl" color="green.500" bold>
              {`$${amount}`}
            </Text>
          </HStack>
        </Center>
        <Box>
          <HStack mt={20}>
            <Center bg="transparent" width={"100%"} height={"50%"}>
              <HStack alignItems="center" justifyContent="center" space={4}>
                <Image
                  width={60}
                  height={60}
                  alt="image"
                  source={require(// @ts-ignore
                  "../assets/icon-36.png")}
                />
                <Text fontSize="2xl" fontWeight="400" color="white">
                  {name}
                </Text>
              </HStack>
            </Center>
          </HStack>
          <Button
            onPress={() => navigation.navigate("Payment", {data: params})}
            marginTop={10}
            width={140}
            height={60}
            alignSelf={"center"}
          >
            Make a payment
          </Button>
        </Box>
      </ScrollView> 
      <KeyboardAvoidingView behavior="height">
        <Text ml={3} color="white">
          Send a message to: <Text bold>{user}</Text>
        </Text>
        <VStack>
          {errors.message && (
            <Text fontSize="xs" alignSelf="center" color="red.400">
              Cannot send blank message
            </Text>
          )}
          <HStack space={3} alignItems="center" justifyContent="center" width={"100%"}>
            <Center width={"80%"}>
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
                    color={"#111827"}
                    bg={"white"}
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
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Preview;
