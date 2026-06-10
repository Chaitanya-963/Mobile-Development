import React from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const accountOptions = [
    { label: "Order History", value: "1 artifact in transit", code: "01" },
    { label: "Payment Registry", value: "Visa / Apple Pay", code: "02" },
    { label: "Delivery Matrices", value: "2 saved locations", code: "03" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Navigation Quick Escape Row Route */}
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>Return to Catalog</Text>
        </Pressable>

        {/* Frameless Profile Identity Core */}
        <View style={styles.profileMeta}>
          <Text style={styles.userInitial}>C</Text>
          <Text style={styles.userName}>Chaitanya</Text>
          <Text style={styles.userTier}>Platinum Tier Access</Text>
        </View>

        {/* Clean Line-separated List Array Blocks */}
        <View style={styles.registryGroup}>
          {accountOptions.map((opt, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.registryRow,
                pressed && styles.rowPressed,
              ]}
              onPress={() =>
                Alert.alert(
                  "Registry",
                  `${opt.label} architecture dashboard active.`,
                )
              }
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIndex}>{opt.code}</Text>
                <View style={styles.textStack}>
                  <Text style={styles.rowLabel}>{opt.label}</Text>
                  <Text style={styles.rowValue}>{opt.value}</Text>
                </View>
              </View>
              <Text style={styles.arrowIcon}>→</Text>
            </Pressable>
          ))}
        </View>

        {/* Clean System Metadata Footer */}
        <Text style={styles.systemFooter}>
          Platform Module v4.12.0 · Security Encryption Active
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  backLink: {
    alignSelf: "flex-start",
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#52525b",
    marginTop: 10,
  },
  backLinkText: {
    color: "#a1a1aa",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  profileMeta: { alignItems: "flex-start", marginTop: 40, gap: 8 },
  userInitial: {
    fontSize: 36,
    fontWeight: "200",
    color: "#ffffff",
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: "300",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  userTier: {
    fontSize: 11,
    color: "#52525b",
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  registryGroup: { marginTop: -20 },
  registryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#121214",
  },
  rowPressed: { opacity: 0.7 },
  rowLeft: { flexDirection: "row", alignItems: "flex-start", gap: 20 },
  rowIndex: { fontSize: 11, color: "#3f3f46", fontWeight: "600", marginTop: 3 },
  textStack: { gap: 4 },
  rowLabel: { fontSize: 14, fontWeight: "400", color: "#ffffff" },
  rowValue: { fontSize: 12, color: "#52525b" },
  arrowIcon: { color: "#3f3f46", fontSize: 14 },
  systemFooter: {
    textAlign: "center",
    fontSize: 10,
    color: "#27272a",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});
