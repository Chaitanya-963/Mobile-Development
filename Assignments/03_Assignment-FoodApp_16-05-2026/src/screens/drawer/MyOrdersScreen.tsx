import React from "react";
import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export default function MyOrdersScreen({ navigation }: any) {
  const { colors, mode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} backgroundColor={colors.bg} />

      <View style={[styles.illustrationCircle, { backgroundColor: colors.bgElevated }]}>
        <Ionicons name="receipt" size={54} color={colors.primary} />
      </View>

      <Text style={[styles.title, { color: colors.textPrimary }]}>Unified Order History</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Live active order tracking, cooking stages, and comprehensive restaurant
        bills are consolidated together inside your primary dashboard layout.
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.actionBtn,
          { backgroundColor: colors.primary },
          pressed && styles.actionBtnPressed,
        ]}
        onPress={() => {
          navigation.navigate("Orders");
        }}
      >
        <Text style={[styles.actionBtnText, { color: colors.textInverse }]}>Go to Orders Feed</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.textInverse} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  illustrationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: { 
    fontSize: 22, 
    fontWeight: "900", 
    marginBottom: 10 
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 28,
  },
  actionBtn: {
    flexDirection: "row",
    height: 54,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  actionBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  actionBtnText: { 
    fontSize: 16, 
    fontWeight: "700" 
  },
});
