import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from './fire';
import { NativeBaseProvider, View } from 'native-base';
import StorageStatusBar from './components/StatusBar.js';
import Launch from './Launch';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    authListener();

    return () => {}
  }, []);

  return (
    <>
      <StorageStatusBar backgroundColor={'#111827'} barStyle="light" />
      <NativeBaseProvider>
        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <Launch user={user} />
        )}
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
});

export default App;
