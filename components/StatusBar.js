import React from 'react';
import Constants from 'expo-constants';
import { StatusBar, SafeAreaView } from 'react-native';

const StorageStatusBar = ({ backgroundColor, barStyle, ...props }) => {
  return (
    <SafeAreaView style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        {...props}
        showHideTransition="fade"
        translucent
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </SafeAreaView>
  );
};

export default StorageStatusBar;
