import { StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
  const isActive = true;
  const buttonStyle = StyleSheet.compose(
    styles.button,
    isActive ? styles.activeButton : null,
  );
  return (
    <View style={styles.container}>
      <View
        // @ts-expect-error
        // style={[styles.button, isActive && styles.activeButton]}
        style={buttonStyle}
      >
        <Text style={styles.buttonText}>Compose Style</Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#ccc", // Default grey
  },
  activeButton: {
    backgroundColor: "#6C63FF", // Override to purple when active
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
