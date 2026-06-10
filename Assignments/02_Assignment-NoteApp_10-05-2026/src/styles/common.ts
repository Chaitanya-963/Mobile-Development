import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});
