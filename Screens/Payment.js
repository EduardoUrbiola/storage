import React from "react";
import { Button } from "native-base";
import { SafeAreaView } from "react-native";

const Payment = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Button my={5} width={"60%"} alignSelf="center" rounded={12}>
        Search
      </Button>
    </SafeAreaView>
  );
};

export default Payment;
