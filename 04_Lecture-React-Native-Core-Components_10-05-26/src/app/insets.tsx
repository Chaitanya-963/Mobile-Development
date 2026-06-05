import { StatusBar,StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useSafeAreaInsets,
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Text style={styles.text}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "#eee",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    opacity: 0.8,
    padding: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff0000",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 1,
  },
});
