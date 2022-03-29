import { ScrollView, VStack } from 'native-base';
import React, {useState} from 'react';
import ResultCard from '../components/ResultCard';



const Result = ({navigation}) => {
  const [resultC, setResultC] = useState([]);

  return (
    <ScrollView>
      <VStack space={9}>
        <ResultCard navigation={navigation} />
        <ResultCard navigation={navigation} />  
      </VStack>
    </ScrollView>
  );
};

export default Result;
