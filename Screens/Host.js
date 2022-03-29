
import React, { useState, useEffect } from 'react';
import formHooks from '../components/forms';
import { Text, Input, Button, VStack, TextInput, TouchableOpacity } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {  Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import storage from '@react-native-firebase/storage'

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fire";

export default function Host() {
  const [image, setImage] = useState(null);

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
        
    let imgName = result[Object.keys(result)[Object.keys(result).length - 4]];
    console.log(imgName);
    console.log
    let realName = imgName.substring(imgName.lastIndexOf('/')+1);
    console.log(realName);
    
    // const reference = storage().ref('realName')
    // try {
    //   await reference.putFile(imgName);
    // } catch (error) {
    //   console.log(error)
    // }

    if (!result.cancelled) {
      setImage(result.uri);
    }
    
  };

  

  return (
    <><>
      <Input
        marginTop={10}
        marginBottom={1}
        color={'white'}
        placeholder="Name"
        width="100%" />
      <Input
        marginTop={1}
        marginBottom={2}
        color={'white'}
        placeholder="Description"
        width="100%"
        height={20} />
      <GooglePlacesAutocomplete
        placeholder='Location'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        } }
        query={{
          key: 'AIzaSyAWJ13AV9Q_g34xUcyNsZf3LyFVSzCvAFc',
          language: 'en',
        }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} >Pick an image from camera roll</Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}

      </View>
    </>
    <Button >Post</Button></>
   
  );
}

