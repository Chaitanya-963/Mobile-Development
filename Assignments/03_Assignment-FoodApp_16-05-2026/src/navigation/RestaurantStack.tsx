import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import RestaurantDetailScreen from "../screens/home/RestaurantDetailScreen";
import CartScreen from "../screens/home/CartScreen";
import { RestaurantStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RestaurantStackParamList>();

export default function RestaurantStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF6B35",
        },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />

      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
