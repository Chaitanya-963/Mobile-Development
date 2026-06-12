import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export default function ProfileScreen() {
  const { colors, mode } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} backgroundColor={colors.bg} />

      {/* 👑 Premium Loyalty & Level Badge Card */}
      <View style={[
        styles.rewardCard, 
        { 
          backgroundColor: mode === "dark" ? colors.bgCard : "#2D2D2D",
          borderColor: colors.border,
          borderWidth: mode === "dark" ? 1 : 0
        }
      ]}>
        <View style={styles.rewardHeader}>
          <View style={[styles.goldBadge, { backgroundColor: colors.warning }]}>
            <Ionicons name="trophy" size={16} color="#FFF" />
            <Text style={styles.goldBadgeText}>Gold Member</Text>
          </View>
          <Text style={[styles.pointsText, { color: colors.primary }]}>2,450 pts</Text>
        </View>
        <Text style={styles.rewardTitle}>Free delivery unlocked!</Text>
        <Text style={[styles.rewardSubtitle, { color: mode === "dark" ? colors.textSecondary : "#A0A0A0" }]}>
          You are 3 orders away from a ₹10 meal voucher.
        </Text>
        
        {/* Visual Progress Bar */}
        <View style={[styles.progressContainer, { backgroundColor: mode === "dark" ? colors.border : "rgba(255,255,255,0.1)" }]}>
          <View style={[styles.progressBar, { width: "70%", backgroundColor: colors.primary }]} />
        </View>
      </View>

      {/* 📊 Fast Stats Counter Bar */}
      <View style={[styles.statsRow, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.textPrimary }]}>48</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Orders</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.textPrimary }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reviews</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.textPrimary }]}>5</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
        </View>
      </View>

      {/* 📝 Account Information Card Group */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Account Details</Text>
      <View style={[styles.infoCard, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
        <View style={styles.infoRow}>
          <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
            <Ionicons name="call" size={18} color={colors.primary} />
          </View>
          <View style={styles.infoTextColumn}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Phone Number</Text>
            <Text style={[styles.value, { color: colors.textPrimary }]}>+91 9876543210</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </View>

        <View style={[styles.cardDivider, { backgroundColor: colors.borderLight }]} />

        <View style={styles.infoRow}>
          <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
            <Ionicons name="location" size={18} color={colors.primary} />
          </View>
          <View style={styles.infoTextColumn}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Primary Address</Text>
            <Text style={[styles.value, { color: colors.textPrimary }]} numberOfLines={1}>
              Chhatrapati Sambhajinagar, MH, India
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </View>

        <View style={[styles.cardDivider, { backgroundColor: colors.borderLight }]} />

        <View style={styles.infoRow}>
          <View style={[styles.iconCircle, { backgroundColor: colors.bgElevated }]}>
            <Ionicons name="card" size={18} color={colors.primary} />
          </View>
          <View style={styles.infoTextColumn}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Saved Payment Method</Text>
            <Text style={[styles.value, { color: colors.textPrimary }]}>HDFC Visa **** 4321</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </View>
      </View>

      {/* ⚙️ Preferences & Activity Card Group */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>My Activity</Text>
      <View style={[styles.infoCard, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
        <Pressable style={styles.infoRow}>
          <View style={[styles.iconCircle, { backgroundColor: mode === "dark" ? "#1A2333" : "#EBF5FF" }]}>
            <Ionicons name="heart" size={18} color={mode === "dark" ? "#3B82F6" : "#2563EB"} />
          </View>
          <View style={styles.infoTextColumn}>
            <Text style={[styles.singleRowValue, { color: colors.textPrimary }]}>Favorite Restaurants</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </Pressable>

        <View style={[styles.cardDivider, { backgroundColor: colors.borderLight }]} />

        <Pressable style={styles.infoRow}>
          <View style={[styles.iconCircle, { backgroundColor: mode === "dark" ? "#13281E" : "#ECFDF5" }]}>
            <Ionicons name="gift" size={18} color={mode === "dark" ? "#10B981" : "#059669"} />
          </View>
          <View style={styles.infoTextColumn}>
            <Text style={[styles.singleRowValue, { color: colors.textPrimary }]}>Offers & Promo Codes</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* Primary Action Button */}
      <Pressable style={[styles.editBtn, { backgroundColor: colors.primary }]}>
        <Ionicons name="create-outline" size={18} color={colors.textInverse} style={styles.btnIcon} />
        <Text style={[styles.editBtnText, { color: colors.textInverse }]}>Edit Profile Details</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  rewardCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  rewardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  goldBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  goldBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "800",
  },
  rewardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  rewardSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
    lineHeight: 18,
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: "row",
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingLeft: 4,
  },
  infoCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoTextColumn: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  singleRowValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  cardDivider: {
    height: 1,
  },
  editBtn: {
    flexDirection: "row",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 40,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  btnIcon: {
    marginRight: 6,
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
