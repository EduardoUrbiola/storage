import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Box,
  Divider,
  Image,
  HStack,
  VStack,
  Center,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../fire';

const Home = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true)
    auth.signOut().then(()=> setLoading(false));
  };
  
  return (
    <View>
      <VStack space={4} alignItems="center" height={'90%'} bg={'#111827'}>
        <Button alignSelf="flex-end" left={0} top={0} variant="outline" onPress={handleLogout}>
          Logout
        </Button>
        <Center>
          <Box>
            <Image
              // @ts-ignore
              source={require('../assets/keeper.png')}
              width="150px"
              height="150px"
              alt="logo"
            />
          </Box>
        </Center>
        <Divider />
        <Center>
          <Text color="white" fontSize="lg">
            Welcome to Keeper 📦 the storage Application
          </Text>
          <HStack>
            <Button isLoading={loading} isLoadingText="Logging out" bg="grey" p={2} m={10} rounded={20} onPress={() => navigation.navigate('Find')}>
            <Image
              // @ts-ignore
              source={require('../assets/open-box.png')}
              width="130px"
              height="130px"
              alt="logo"
            />
              <Text fontSize="lg" color="white" bold textAlign="center">
                Find Storage
              </Text>
            </Button>
            <Button isLoading={loading} isLoadingText="Logging out" bg="grey" p={2} m={10} rounded={20} onPress={() => navigation.navigate('Host')}>
            <Image
              // @ts-ignore
              source={require('../assets/home-3.png')}
              width="140px"
              height="140px"
              alt="logo"
            />
              <Text fontSize="lg" color="white" bold textAlign="center">
                Become a host
              </Text>
            </Button>
          </HStack>
        </Center>
      </VStack>
    </View>
  );
};

export default Home;
