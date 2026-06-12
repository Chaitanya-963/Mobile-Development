import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import MyOrdersScreen from "../screens/drawer/MyOrdersScreen";
import SettingsScreen from "../screens/drawer/SettingsScreen";
import HelpScreen from "../screens/drawer/HelpScreen";
import { ProfileDrawerParamList } from "../types/navigation";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { useTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export default function ProfileDrawer() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.bgCard,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: "800", fontSize: 18 },
        drawerStyle: { backgroundColor: colors.bgCard, width: 290 },
        drawerActiveBackgroundColor: colors.bgElevated,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerInactiveBackgroundColor: "transparent",
        drawerLabelStyle: { fontWeight: "700", fontSize: 14 },
        drawerItemStyle: {
          borderRadius: 20,
          paddingVertical: 2,
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "My Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{
          title: "Track Orders",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: "Help & Support",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
