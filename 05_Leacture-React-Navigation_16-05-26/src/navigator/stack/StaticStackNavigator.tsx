import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailScreens from "../../screens/DetailScreens";
import ProfileScreen from "../../screens/ProfileScreen";

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

export default function StaticStackNavigator() {
  return <Navigation />;
}
