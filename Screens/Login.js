import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import formHooks from '../components/forms';
import { Text, Input, Button, Stack, Box, Center, VStack } from 'native-base';
import { auth } from '../fire';

const Login = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const { Controller, control, errors, handleSubmit } = formHooks();

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };
  const handleLogin = (data) => {
    clearErrors();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => setLoading(false))
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disable':
          case 'auth/user-not-found':
            setEmailError(err.message);
            setLoading(false);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            setLoading(false);
            break;
        }
      });
  };

  const handleSignup = (data) => {
    clearErrors();
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => setLoading(false))
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            setEmailError(err.message);
            setLoading(false);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            setLoading(false);
            break;
        }
      });
  };

  return (
    <VStack>
      <View style={styles.loginContainer}>
        <Stack space={5} width={'100%'}>
          <Center>
            <Box p={4}>
              {emailError ? (
                <Text style={(styles.error, { alignSelf: 'center', color: 'red' })} fontSize="md">
                  {emailError}
                </Text>
              ) : undefined}
              {emailError ? (
                <Text fontSize="md" style={(styles.error, { alignSelf: 'center', color: 'red' })}>
                  {passwordError}
                </Text>
              ) : undefined}
            </Box>
          </Center>
          <Box>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  color={'white'}
                  variant="rounded"
                  placeholder="Email"
                />
              )}
              name="email"
              defaultValue=""
            />
            {errors.email && (
              <Text sub style={styles.error}>
                This is required.
              </Text>
            )}
          </Box>

          <Box>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  variant="rounded"
                  color={'white'}
                  placeholder="Password"
                />
              )}
              name="password"
              defaultValue=""
            />
            {errors.password && (
              <Text sub style={styles.error}>
                This is required.
              </Text>
            )}
          </Box>
        </Stack>

        <View style={styles.btnContainer}>
          {hasAccount ? (
            <>
              <Button
                isLoading={loading}
                isLoadingText="Signing in"
                onPress={handleSubmit(handleLogin)}
              >
                Sign in
              </Button>
              <Center>
                <Text color="white">Don't have an account?</Text>
                <Button variant="link" onPress={() => setHasAccount(!hasAccount)}>
                  Sign up
                </Button>
              </Center>
            </>
          ) : (
            <>
              <Button
                isLoading={loading}
                isLoadingText="Signing up"
                onPress={handleSubmit(handleSignup)}
              >
                Sign up
              </Button>
              <Center>
                <Text color="white">Have an account?</Text>
                <Button variant="link" onPress={() => setHasAccount(!hasAccount)}>
                  Sign in
                </Button>
              </Center>
            </>
          )}
        </View>
      </View>
    </VStack>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    padding: 60,
    width: '100%',
    maxWidth: 520,
    minHeight: 600,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    fontSize: 13,
    padding: 10,
    letterSpacing: 1,
  },
  error: {
    color: 'red',
    paddingLeft: 10,
    fontSize: 11,
  },
  button: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
    backgroundColor: '#603bbb',
  },
  btnContainer: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 24,
  },
});

export default Login;
