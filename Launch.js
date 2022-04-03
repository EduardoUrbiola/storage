import React from "react";
import { Platform } from "react-native";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Components View
import { Home, Login, Find, Result, Preview, Chat, Host, Payment } from "./Screens";

const Launch = ({ user }) => {
  const MainView = createStackNavigator();

  return (
    <>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainView.Navigator
            mode="card"
            headerMode="float"
            screenOptions={() => ({
              cardStyle: {
                backgroundColor: "#111827",
              },
              headerStyle: {
                backgroundColor: "#0b619b",
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 1,
                shadowRadius: 6,
                height: 55,
              },
              headerTintColor: "white",
              headerShown: Platform.OS === "ios" ? true : false,
            })}
          >
            {user ? (
              <>
                <MainView.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <MainView.Screen name="Find" component={Find} />
                <MainView.Screen name="Host" component={Host} />
                <MainView.Screen name="Result" component={Result} />
                <MainView.Screen name="Preview" component={Preview} />
                <MainView.Screen name="Payment" component={Payment} />
                <MainView.Screen name="Chat" component={Chat} options={{ headerShown: true }} />
              </>
            ) : (
              <>
                <MainView.Screen name="Login" component={Login} />
              </>
            )}
          </MainView.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default Launch;
