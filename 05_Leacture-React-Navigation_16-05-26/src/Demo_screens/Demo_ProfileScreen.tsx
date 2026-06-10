import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const accountOptions = [
    {
      label: "Order History & Tracking",
      value: "1 package arriving tomorrow",
      icon: "📦",
    },
    {
      label: "Payment Methods",
      value: "Visa ending in 4242 · Apple Pay",
      icon: "💳",
    },
    {
      label: "Shipping Addresses",
      value: "2 saved delivery locations",
      icon: "📍",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Navigation Quick Escape Route */}
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backHomeText}>← Back to Store</Text>
        </Pressable>

        {/* Customer Profile Hub Frame */}
        <View style={styles.profileSection}>
          <View style={styles.bigAvatar}>
            <Text style={styles.avatarText}>C</Text>
          </View>
          <Text style={styles.userName}>Chaitanya</Text>
          <View style={styles.badgeWrapper}>
            <Text style={styles.userTier}>✨ Platinum Member</Text>
          </View>
        </View>

        {/* Group Config List Block */}
        <View style={styles.settingsGroup}>
          {accountOptions.map((opt, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.settingsRow,
                index !== accountOptions.length - 1 && styles.rowBorder,
                pressed && styles.rowPressed,
              ]}
              onPress={() =>
                Alert.alert(
                  "Account Matrix",
                  `${opt.label} under secure sandbox update.`,
                )
              }
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>{opt.icon}</Text>
                <View>
                  <Text style={styles.rowLabel}>{opt.label}</Text>
                  <Text style={styles.rowVal}>{opt.value}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>→</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.footerVersion}>
          Store Engine v4.12.0 · Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  wrapper: { padding: 24, justifyContent: "space-between", flex: 1 },
  backHomeText: {
    color: "#a1a1aa",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  profileSection: { alignItems: "center", marginTop: 10 },
  bigAvatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, fontWeight: "700", color: "#000000" },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  badgeWrapper: {
    backgroundColor: "#27272a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  userTier: { fontSize: 12, color: "#ffffff", fontWeight: "600" },
  settingsGroup: {
    backgroundColor: "#18181b",
    borderRadius: 18,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#27272a",
    marginTop: -20,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#27272a" },
  rowPressed: { backgroundColor: "#27272a" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  rowIcon: { fontSize: 20 },
  rowLabel: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  rowVal: { fontSize: 12, color: "#71717a", marginTop: 4 },
  chevron: { color: "#71717a", fontSize: 16, fontWeight: "600" },
  footerVersion: {
    textAlign: "center",
    fontSize: 11,
    color: "#3f3f46",
    fontWeight: "500",
    marginBottom: 10,
  },
});
