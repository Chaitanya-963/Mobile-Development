import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext"; 

export default function SettingsScreen() {
  const { mode, colors, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} backgroundColor={colors.bg} />

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>App Preferences</Text>
      <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
        <View style={styles.row}>
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
              <Ionicons name="notifications" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Push Notifications</Text>
              <Text style={[styles.rowSub, { color: colors.textMuted }]}>
                Alerts for deals & order tracking
              </Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: colors.primary, false: mode === "dark" ? "#333" : "#D0D0D0" }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

        <View style={styles.row}>
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
              <Ionicons name="location" size={18} color={colors.info || "#3B82F6"} />
            </View>
            <View>
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Location Access</Text>
              <Text style={[styles.rowSub, { color: colors.textMuted }]}>Used to find nearby restaurants</Text>
            </View>
          </View>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ true: colors.primary, false: mode === "dark" ? "#333" : "#D0D0D0" }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

        <View style={styles.row}>
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
              <Ionicons name="moon" size={18} color={mode === "dark" ? colors.accent : "#7C3AED"} />
            </View>
            <View>
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Dark Mode</Text>
              <Text style={[styles.rowSub, { color: colors.textMuted }]}>Switch to a low-light interface</Text>
            </View>
          </View>
          <Switch
            value={mode === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ true: colors.primary, false: mode === "dark" ? "#333" : "#D0D0D0" }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Security & Legal</Text>
      <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
        <Pressable style={styles.row}>
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
              <Ionicons name="lock-closed" size={18} color={colors.textSecondary} />
            </View>
            <Text style={[styles.clickableLabel, { color: colors.textPrimary }]}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </Pressable>

        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

        <Pressable style={styles.row}>
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
              <Ionicons name="document-text" size={18} color={colors.textSecondary} />
            </View>
            <Text style={[styles.clickableLabel, { color: colors.textPrimary }]}>Terms of Service</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      <Text style={[styles.versionText, { color: colors.textMuted }]}>FoodBite App v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingLeft: 4,
  },
  card: {
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  leftRow: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  rowSub: { fontSize: 12, fontWeight: "500" },
  clickableLabel: { fontSize: 15, fontWeight: "700" },
  divider: { height: 1 },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 30,
  },
});
