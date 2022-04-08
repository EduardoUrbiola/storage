import React, { useEffect, useState } from "react";
import { Button, Input, ScrollView, Text, View, VStack } from "native-base";
import { Alert, SafeAreaView } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { Controller, useForm } from "react-hook-form";

const Payment = ({ route: { params } }) => {
  const { presentPaymentSheet, initPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const {
    data: { amount, user },
  } = params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: user,
    },
  });

  const fetchPaymentSheetParams = async (data) => {
    try {
      const createPayment = await fetch(process.env.FUNCTIONS_ENDPOINT + "/createPaymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (createPayment.status !== 200) {
        setLoading(false);
        Alert.alert("Error", "Something went wrong");
      } else {
        const { paymentIntent, ephemeralKey, customer } = await createPayment.json();
        return {
          paymentIntent,
          ephemeralKey,
          customer,
        };
      }
    } catch (error) {
      console.log("error calling function: ", error);
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(false);
    } else {
      setLoading(false);
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const paymentSheet = await fetchPaymentSheetParams({ ...data, amount: amount * 100 });
      const { paymentIntent, ephemeralKey, customer } = paymentSheet;

      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
      });

      if (!error) {
        openPaymentSheet();
      }
    } catch (error) {
      setLoading(false);
      console.log("init failed: ", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text mt={3} bold color="white">
          Enter your informations:
        </Text>

        <VStack space={5} px={2} mt={3}>
          <View>
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
                  p={3}
                  placeholder="Enter your Name..."
                />
              )}
              name="name"
            />
            {errors.name && <Text color="red.400">Required</Text>}
          </View>

          <View>
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
                  p={3}
                  placeholder="Enter your email..."
                />
              )}
              name="email"
            />
            {errors.email && <Text color="red.400">Required</Text>}
          </View>

          <Button isLoading={loading} onPress={handleSubmit(onSubmit)}>
            Proceed with payment
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
