import * as React from "react";
import { Text, View } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { Button, HeaderShownContext } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("Details")}>
        Go to Details
      </Button>
    </View>
  );
}

function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button onPress={() => navigation.navigate("Profile")}>
        Go to Profile
      </Button>
    </View>
  );
}
function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button onPress={() => navigation.navigate("Home")}>Go to Home</Button>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 85,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
        tabBarIcon: ({ focused, color, size }) => {
           let iconName: React.ComponentProps<typeof Ionicons>['name'] = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Details") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size + 2} color={color} />;
        },
        tabBarActiveTintColor: "#2f95dc",
        tabBarInactiveTintColor: "#ccc",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function DynamicTabNavigator() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
