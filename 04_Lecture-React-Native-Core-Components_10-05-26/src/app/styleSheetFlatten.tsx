import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={{ padding: 25 }}
    >
      <Text style={flat}>Flattend Style!</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const stylesA = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 16,
  },
});
const stylesB = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

const flat = StyleSheet.flatten([stylesA.text, stylesB.text]);
