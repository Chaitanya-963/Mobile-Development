import * as React from "react";
import { View, Text } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Demo_HomeScreen";
import DetailScreens from "./Demo_DetailScreens";
import ProfileScreen from "./Demo_ProfileScreen";

const stack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    animation: "slide_from_right",
  },
  screens: {
    Home: HomeScreen,
    Details: DetailScreens,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(stack);

export default function App() {
  return <Navigation />;
}
