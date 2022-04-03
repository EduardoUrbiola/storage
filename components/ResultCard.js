import React from "react";
// @ts-ignore
import { Text, Pressable, Box, Center, VStack, HStack, AspectRatio, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";

const ResultCard = (data) => {
  const navigation = useNavigation();
  const {image, location, description, user} = data
  return (
    <VStack space={20}>
      <Pressable
        _pressed={{ bgColor: "darkblue" }}
        p={2}
        onPress={() => navigation.navigate("Preview", data)}
      >
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              roundedTop="lg"
              source={{
                uri: image,
              }}
              alt="image"
            />
          </AspectRatio>

            
          <Center
            p={1}
            rounded="full"
            bg="red.500"
            boxSize={12}
            position="absolute"
            left={0}
            mx={2}
            zIndex={3}
            _text={{
              color: "white",
              textAlign: "center",
              fontWeight: "700",
              fontSize: "xs",
            }}
          >
            <Image
              alt="image"
              source={require(// @ts-ignore
              '../assets/icon-36.png')}
            />
          </Center>
          <Center
            bg="transparent"
            _text={{
              color: "white",
              fontWeight: "900",
              fontSize: "lg",
            }}
            position="absolute"
            top={0}
            width={"80%"}
            height={"20%"}
            px={2}
            py={1}
          >
            {user}
          </Center>

          <Center px={3}>
            <HStack space={5}>
              <Text textAlign="center" fontSize="2xl" color="white" bold>
               {description.length > 20 ? `${description.substring(0, 20)}...` : description}
              </Text>
              {/* <Text fontSize="2xl" color="green.500" bold>
                $50
              </Text> */}
            </HStack>
          </Center>
        </Box>
      </Pressable>
    </VStack>
  );
};

export default ResultCard;
