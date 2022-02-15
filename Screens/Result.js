import { ScrollView, VStack } from 'native-base';
import React from 'react';
import ResultCard from '../components/ResultCard';

const Result = ({navigation}) => {
  return (
    <ScrollView>
      <VStack space={9}>
        <ResultCard navigation={navigation} />
        <ResultCard navigation={navigation} />
        <ResultCard navigation={navigation} />
        <ResultCard navigation={navigation} />
        <ResultCard navigation={navigation} />
      </VStack>
    </ScrollView>
  );
};

export default Result;
