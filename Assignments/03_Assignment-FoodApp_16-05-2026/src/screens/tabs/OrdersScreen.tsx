import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PAST_ORDERS } from "../../constants/restaurants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function OrdersScreen() {
  const { colors, mode } = useTheme();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        My Orders
      </Text>

      {/* 🏎️ Premium Active Order Tracking Card */}
      <View style={styles.activeOrderSection}>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Active Order
        </Text>
        <View
          style={[
            styles.activeCard,
            {
              backgroundColor: colors.bgCard,
              borderColor: mode === "dark" ? colors.border : "#FFEBE3",
            },
          ]}
        >
          <View style={styles.activeTopRow}>
            <View style={styles.activeBrand}>
              <View
                style={[
                  styles.activeEmojiCircle,
                  { backgroundColor: colors.bgElevated },
                ]}
              >
                <Text style={styles.activeEmoji}>🍕</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.activeName, { color: colors.textPrimary }]}
                >
                  Pizza Piazza
                </Text>
                <Text
                  style={[styles.activeItems, { color: colors.textSecondary }]}
                  numberOfLines={1}
                >
                  1x Margherita, 1x Garlic Bread
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: colors.bgElevated },
              ]}
            >
              <Text style={[styles.statusBadgeText, { color: colors.primary }]}>
                Cooking
              </Text>
            </View>
          </View>

          {/* Dynamic Visual Delivery Progress Bar Indicator */}
          <View
            style={[
              styles.progressTrackContainer,
              { backgroundColor: mode === "dark" ? colors.border : "#F5F5F5" },
            ]}
          >
            <View
              style={[
                styles.progressBar,
                { width: "45%", backgroundColor: colors.primary },
              ]}
            />
          </View>

          <View style={styles.deliveryEstimateRow}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={[styles.estimateText, { color: colors.textPrimary }]}>
              Estimated Arrival: 15-20 mins
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Order History
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.bg }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.bg}
      />

      <FlatList
        data={PAST_ORDERS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="receipt-outline"
              size={64}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No past orders found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.pastCard,
              { backgroundColor: colors.bgCard, borderColor: colors.border },
            ]}
          >
            <View style={styles.pastCardHeader}>
              <View style={styles.pastBrandRow}>
                <View
                  style={[
                    styles.pastEmojiCircle,
                    { backgroundColor: colors.bgElevated },
                  ]}
                >
                  <Text style={styles.pastEmoji}>{item.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.pastName, { color: colors.textPrimary }]}
                  >
                    {item.restaurantName}
                  </Text>
                  <Text
                    style={[styles.pastDate, { color: colors.textSecondary }]}
                  >
                    {item.date} • {item.status}
                  </Text>
                </View>
              </View>
              {/* Changed Currency Display to Rupee Symbol */}
              <Text style={[styles.pastPrice, { color: colors.textPrimary }]}>
                ₹{item.total.toFixed(2)}
              </Text>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.borderLight }]}
            />

            <View style={styles.pastCardFooter}>
              <Text
                style={[styles.itemsSummary, { color: colors.textMuted }]}
                numberOfLines={1}
              >
                {item.items.join(", ")}
              </Text>
              <Pressable
                style={[
                  styles.reorderButton,
                  { backgroundColor: colors.bgElevated },
                ]}
              >
                <Ionicons
                  name="refresh-outline"
                  size={14}
                  color={colors.primary}
                  style={styles.reorderIcon}
                />
                <Text style={[styles.reorderText, { color: colors.primary }]}>
                  Reorder
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 24,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  activeOrderSection: {
    marginBottom: 28,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingLeft: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },
  activeCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  activeTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activeBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: 8,
  },
  activeEmojiCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  activeEmoji: {
    fontSize: 22,
  },
  activeName: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2,
  },
  activeItems: {
    fontSize: 13,
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  progressTrackContainer: {
    height: 6,
    borderRadius: 3,
    position: "relative",
    marginBottom: 14,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  deliveryEstimateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  estimateText: {
    fontSize: 13,
    fontWeight: "600",
  },
  pastCard: {
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  pastCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pastBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    marginRight: 8,
  },
  pastEmojiCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  pastEmoji: {
    fontSize: 18,
  },
  pastName: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  pastDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  pastPrice: {
    fontSize: 15,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  pastCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemsSummary: {
    fontSize: 13,
    flex: 1,
    marginRight: 12,
  },
  reorderButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reorderIcon: {
    marginRight: 4,
  },
  reorderText: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
});
