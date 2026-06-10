import * as React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";
import DetailScreens from "../../screens/DetailScreens";
import ProfileScreen from "../../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#000000" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#ffffff",
        }}
      />
      <Stack.Screen name="Details" component={DetailScreens} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function DynamicStackNavigator() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <MyStack />
    </NavigationContainer>
  );
}
