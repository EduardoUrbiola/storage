import React from 'react';
// @ts-ignore
import {
  Text,
  Pressable,
  Box,
  Center,
  VStack,
  Button,
  HStack,
  AspectRatio,
  Image,
} from 'native-base';

const ResultCard = ({ navigation }) => {
  return (
    <VStack space={20}>
      <Pressable _pressed={{bgColor: 'darkblue'}} p={2} onPress={() => navigation.navigate('Preview')}>
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              roundedTop="lg"
              source={{
                uri: 'https://www.rexburg.com/images/activities/Mzk=/1214_WaterTower4.jpg',
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
            mx={10}
            zIndex={3}
            _text={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 'xs',
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
              color: 'white',
              fontWeight: '700',
              fontSize: 'lg',
            }}
            position="absolute"
            top={0}
            width={'80%'}
            height={'20%'}
            px={2}
            py={1}
          >
            Shane Clements
          </Center>
          <Center>
            <HStack space={5}>
              <Text fontSize="2xl" color="white" bold>
                Rexburg, Idaho
              </Text>
              <Text fontSize="2xl" color="green.500" bold>
                $50
              </Text>
            </HStack>
          </Center>
        </Box>
      </Pressable>
    </VStack>
  );
};

export default ResultCard;
