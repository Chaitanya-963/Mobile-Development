import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import React from "react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: (value: boolean) => void;
  theme: any;
}

const ThemeToggle = ({ isDarkMode, onToggle, theme }: ThemeToggleProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>
        {isDarkMode ? "Dark mode" : "Light mode"}
      </Text>

      <View style={styles.switchContainer}>
        <Switch
          value={isDarkMode}
          thumbColor="#ffffff"
          onValueChange={onToggle}
          trackColor={{
            false: "#cbd5e1",
            true: theme.primary,
          }}
        />
        <View 
          pointerEvents="none" 
          style={[
            styles.iconWrapper, 
            isDarkMode ? styles.iconRight : styles.iconLeft
          ]}
        >
          <Text style={styles.iconText}>{isDarkMode ? "🌙" : "☀️"}</Text>
        </View>
      </View>
    </View>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal:20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  switchContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconWrapper: {
    position: "absolute",
    flex:1,
    justifyContent:"center",
    zIndex: 1,
  },
  iconLeft: {
    left: Platform.OS === "ios" ? 6 : 6,
  },
  iconRight: {
    right: Platform.OS === "ios" ? 6 : 6,
  },
  iconText: {
    fontSize: 14,
  },
});
