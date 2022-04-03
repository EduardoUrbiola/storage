import React from "react";
import { Button, Text, View, VStack } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native";
import { Controller, useForm } from "react-hook-form";

const Find = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const onSubmit = (data) => {
    navigation.navigate("Result", { location: data.location });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack justifyContent="space-between" flex={1}>
        {errors.location && <Text color="red.400">This field is required</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <GooglePlacesAutocomplete
              placeholder="Location"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                const result = {
                  description: data.description,
                  placeId: data.place_id,
                  reference: data.reference,
                  structured_formatting: data.structured_formatting,
                };
                onChange(result);
              }}
              query={{
                key: process.env.GOOGLE_PLACE_API_KEY,
                language: "en",
              }}
              enablePoweredByContainer={false}
            />
          )}
          name="location"
        />

        <Button width={"60%"} alignSelf="center" rounded={12} onPress={handleSubmit(onSubmit)}>
          Search
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default Find;
