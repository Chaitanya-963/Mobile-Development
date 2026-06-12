import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export default function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  const { colors, mode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgCard }]}>
      <View
        style={[
          styles.headerBackground,
          { backgroundColor: colors.bg, borderColor: colors.border },
        ]}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: colors.bgCard, borderColor: colors.primary },
              ]}
            >
              <Ionicons name="person" size={36} color={colors.primary} />
            </View>
            <View
              style={[
                styles.verifiedBadge,
                { borderColor: colors.bgCard, backgroundColor: colors.success },
              ]}
            >
              <Ionicons name="checkmark" size={10} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.userMeta}>
            <View
              style={[
                styles.tagContainer,
                { backgroundColor: colors.bgElevated },
              ]}
            >
              <Text style={[styles.tagText, { color: colors.primary }]}>
                ⭐ Food Lover
              </Text>
            </View>
            <Text
              style={[styles.userName, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              Chaitanya
            </Text>
            <Text
              style={[styles.userEmail, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              chaitanya@example.com
            </Text>
          </View>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.itemsWrapper}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={[
          styles.footerContainer,
          { borderColor: colors.border, backgroundColor: colors.bgCard },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            {
              backgroundColor: mode === "dark" ? "#2A1F1F" : "#FEF2F2",
              borderColor: mode === "dark" ? "#442222" : "#FEE2E2",
            },
            pressed && styles.logoutButtonPressed,
          ]}
          onPress={logout}
        >
          <View
            style={[
              styles.logoutIconCircle,
              { backgroundColor: colors.bgCard },
            ]}
          >
            <Ionicons name="log-out-outline" size={18} color={colors.error} />
          </View>
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBackground: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: height * 0.07,
    paddingBottom: 24,
    borderWidth: 1,
  },
  profileHeader: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatarWrapper: { position: "relative" },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  userMeta: { flex: 1, justifyContent: "center" },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  tagText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
  userName: { fontSize: 20, fontWeight: "900", letterSpacing: 0.3 },
  userEmail: { fontSize: 12, fontWeight: "500", marginTop: 1 },
  scrollContainer: { paddingTop: 12 },
  itemsWrapper: { paddingHorizontal: 10 },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
  },
  logoutButtonPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  logoutIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { fontSize: 15, fontWeight: "700", letterSpacing: 0.2 },
});
