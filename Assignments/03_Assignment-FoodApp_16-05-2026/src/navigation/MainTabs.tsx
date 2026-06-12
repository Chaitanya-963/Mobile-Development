import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import RestaurantStack from "./RestaurantStack";
import SearchScreen from "../screens/tabs/SearchScreen";
import OrdersScreen from "../screens/tabs/OrdersScreen";
import ProfileDrawer from "./ProfileDrawer";
import { BottomTabParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator<BottomTabParamList>();

function getTabBarVisibility(route: any): any {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName === "RestaurantDetail" || routeName === "Cart") {
    return "none";
  }
  return "flex";
}

export default function MainTabs() {
  const { totalItems = 0 } = useCart();
  const { colors, mode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginBottom: Platform.OS === "ios" ? 0 : 6,
        },
        tabBarStyle: {
          display: getTabBarVisibility(route),
          backgroundColor: colors.bgCard,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: mode === "dark" ? 0.2 : 0.04,
          shadowRadius: 12,
          elevation: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "HomeTab")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Search")
            iconName = focused ? "search" : "search-outline";
          else if (route.name === "Orders")
            iconName = focused ? "receipt" : "receipt-outline";
          else iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={size + 2} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={RestaurantStack}
        options={({ route }) => ({
          title: "Home",
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: colors.bgCard,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: Platform.OS === "ios" ? 88 : 64,
            paddingTop: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: mode === "dark" ? 0.2 : 0.04,
            shadowRadius: 12,
            elevation: 10,
          },
        })}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search" }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: "Orders",
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
            color: colors.textInverse,
            fontSize: 11,
            fontWeight: "800",
            lineHeight: 15,
            marginTop: Platform.OS === "ios" ? -2 : 2,
          },
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileDrawer}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
