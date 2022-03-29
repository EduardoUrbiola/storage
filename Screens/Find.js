
import React, { useState, useEffect } from 'react';
import formHooks from '../components/forms';
import { Text, Input, Box, Center, VStack, Button, TextInput, TouchableOpacity, View } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

const Find = ({navigation}) => {
  const { Controller, control, errors, handleSubmit } = formHooks();

  const search = (data) => {
  
    navigation.navigate("Result")
  };
    return (
      
        <><GooglePlacesAutocomplete
        placeholder='Location'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        } }
        query={{
          key: 'AIzaSyAWJ13AV9Q_g34xUcyNsZf3LyFVSzCvAFc',
          language: 'en',
        }} /><Button my={-5} marginTop={-100} width={'60%'} alignSelf="center" rounded={12} onPress={(search)}>
          Search
        </Button></>

      
      );
      
};


export default Find;



