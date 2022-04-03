import React, { useEffect, useState } from "react";
import { Text, Input, Button, TextArea, VStack, ScrollView } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Image, SafeAreaView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { auth, db, storage } from "../fire";
import AlertModal from "../components/Alert";

export default function Host() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ header: "", body: "", error: false });
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      }
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const imgName = result[Object.keys(result)[Object.keys(result).length - 4]];
    let realName = imgName.substring(imgName.lastIndexOf("/") + 1);

    if (!result.cancelled) {
      setImageName(realName);
      setImage(result["uri"]);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    let docRef;
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const uploadImage = await storage.ref("images").child(imageName).put(blob);
      const imagePath = await uploadImage.ref.getDownloadURL();
      docRef = await db.collection("hosts").add({ ...data, user, image: imagePath});
      // console.log("submitted: ", storeInfo);
      setSubmitting(false);
      setMessage({
        header: "Uploaded",
        body: "Record posted successfully!",
        error: false,
      });
    } catch (error) {
      setSubmitting(false);
      setMessage({
        header: "Failed",
        body: error["message"] || "Failed to post record!",
        error: true,
      });
      docRef.delete();
      console.log("failed: ", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <VStack space={5} mb={2} flex={1}>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  marginTop={10}
                  marginBottom={1}
                  color={"white"}
                  placeholder="name"
                  width="100%"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && <Text color="red.400">This is required.</Text>}
          </View>

          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  // marginTop={1}
                  // marginBottom={2}
                  color={"white"}
                  placeholder="Description"
                  width="100%"
                  // height={20}
                />
              )}
              name="description"
            />
            {errors.name && <Text color="red.400">This is required.</Text>}
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ height: 200, flex: 1 }}>
                <GooglePlacesAutocomplete
                  placeholder="Location"
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.log(data);
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
                  keyboardShouldPersistTaps="always"
                  listViewDisplayed="auto"
                  enablePoweredByContainer={false}
                  onFail={(error) => console.log(error)}
                  onTimeout={() => console.log("Timed out!")}
                />
              </View>
            )}
            name="location"
          />
        </VStack>

        <VStack space={5} justifyContent="center" alignItems="center">
          <Button onPress={pickImage}>Pick an image from camera roll</Button>
          {image && (
            <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />
          )}
          <Button
            w="40%"
            isLoading={submitting}
            isLoadingText="Posting"
            onPress={handleSubmit(onSubmit)}
          >
            Post
          </Button>
        </VStack>
        <AlertModal
          isOpen={!!message.body}
          header={message.header}
          body={message.body}
          okBgColor={message.error && "red"}
          onOk={() => setMessage({ header: "", body: "", error: false })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
