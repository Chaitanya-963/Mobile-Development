import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import {
  RESTAURANTS,
  CATEGORIES,
  PAST_ORDERS,
} from "../../constants/restaurants";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const { colors, mode } = useTheme();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.welcomeRow}>
        <View style={styles.profileContainer}>
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: colors.bgElevated },
            ]}
          >
            <Ionicons name="person" size={18} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.welcomeSub, { color: colors.textSecondary }]}>
              Good morning 👋
            </Text>
            <Text style={[styles.profileName, { color: colors.textPrimary }]}>
              Chaitanya
            </Text>
          </View>
        </View>
        <Pressable
          style={[
            styles.locationBadge,
            { backgroundColor: colors.bgCard, borderColor: colors.border },
          ]}
        >
          <Ionicons name="location-sharp" size={14} color={colors.primary} />
          <Text style={[styles.locationText, { color: colors.textSecondary }]}>
            Home
          </Text>
          <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
        </Pressable>
      </View>

      <Text style={[styles.greetingText, { color: colors.textPrimary }]}>
        Let's find some delicious food!
      </Text>

      <View
        style={[
          styles.searchWrapper,
          { backgroundColor: colors.bgCard, borderColor: colors.border },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search food, restaurants, dishes..."
          placeholderTextColor={colors.textMuted}
          style={[styles.searchInput, { color: colors.textPrimary }]}
        />
        <Pressable
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="options-outline" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategoryId === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => setActiveCategoryId(cat.id)}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: colors.bgCard,
                    borderColor: colors.border,
                  },
                  isSelected && {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    { color: colors.textSecondary },
                    isSelected && { color: "#FFFFFF" },
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {PAST_ORDERS.length > 0 && (
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Order Again
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.orderAgainScroll}
          >
            {PAST_ORDERS.map((order) => (
              <View
                key={order.id}
                style={[
                  styles.orderAgainCard,
                  {
                    backgroundColor: colors.bgCard,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.orderCardHeader}>
                  <View
                    style={[
                      styles.orderIconCircle,
                      { backgroundColor: colors.bgElevated },
                    ]}
                  >
                    <Text style={styles.orderEmoji}>{order.emoji}</Text>
                  </View>
                  <View style={styles.orderMeta}>
                    <Text
                      style={[
                        styles.orderRestaurant,
                        { color: colors.textPrimary },
                      ]}
                      numberOfLines={1}
                    >
                      {order.restaurantName}
                    </Text>
                    <Text
                      style={[styles.orderDate, { color: colors.textMuted }]}
                    >
                      {order.date}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[styles.orderItems, { color: colors.textSecondary }]}
                  numberOfLines={1}
                >
                  {order.items.join(", ")}
                </Text>
                <View
                  style={[
                    styles.orderActionRow,
                    { borderColor: colors.borderLight },
                  ]}
                >
                  <Text style={[styles.orderPrice, { color: colors.primary }]}>
                    ₹{order.total.toFixed(2)}
                  </Text>
                  <Pressable
                    style={[
                      styles.reorderButton,
                      { backgroundColor: colors.bgElevated },
                    ]}
                  >
                    <Text
                      style={[styles.reorderText, { color: colors.primary }]}
                    >
                      Reorder
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Popular Restaurants
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
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.bgCard, borderColor: colors.border },
              pressed && styles.cardPressed,
            ]}
            onPress={() =>
              navigation.navigate("RestaurantDetail", { restaurantId: item.id })
            }
          >
            <View
              style={[styles.imageBox, { backgroundColor: colors.bgElevated }]}
            >
              <Image
                source={item.image}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <View
                style={[styles.tagBadge, { backgroundColor: item.tagColor }]}
              >
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            </View>

            <View style={styles.cardInfo}>
              <View style={styles.nameRow}>
                <Text style={[styles.nameText, { color: colors.textPrimary }]}>
                  {item.name}
                </Text>

                <View
                  style={[
                    styles.ratingBox,
                    {
                      backgroundColor: mode === "dark" ? "#2B2211" : "#FFF9E6",
                    },
                  ]}
                >
                  <Ionicons name="star" size={13} color="#FFB000" />
                  <Text
                    style={[styles.ratingText, { color: colors.textPrimary }]}
                  >
                    {item.rating}
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.metaSubtext, { color: colors.textSecondary }]}
              >
                {item.cuisine} • {item.priceRange} • Min. ₹
                {item.minOrder.toFixed(2)}
              </Text>

              <View
                style={[
                  styles.logisticRow,
                  { borderColor: colors.borderLight },
                ]}
              >
                <View style={styles.logisticItem}>
                  <Ionicons
                    name="time-outline"
                    size={15}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.logisticText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.deliveryTime}
                  </Text>
                </View>
                <View style={styles.logisticItem}>
                  <Ionicons
                    name="bicycle-outline"
                    size={15}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.logisticText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.deliveryFee === 0
                      ? "Free"
                      : `₹${item.deliveryFee.toFixed(2)}`}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { paddingBottom: 24 },
  headerContainer: { paddingTop: 8 },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  profileContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeSub: { fontSize: 12, fontWeight: "500" },
  profileName: { fontSize: 15, fontWeight: "700" },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  locationText: { fontSize: 13, fontWeight: "700" },
  greetingText: {
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
    maxWidth: "85%",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14 },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionBlock: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  categoryScroll: { gap: 10, paddingHorizontal: 16 },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    gap: 6,
  },
  categoryCardSelected: { borderColor: "transparent" },
  categoryEmoji: { fontSize: 16 },
  categoryLabel: { fontSize: 14, fontWeight: "700" },
  categoryLabelSelected: { color: "#FFFFFF" },
  orderAgainScroll: { gap: 12, paddingHorizontal: 16 },
  orderAgainCard: { borderRadius: 16, borderWidth: 1, padding: 12, width: 210 },
  orderCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  orderIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  orderEmoji: { fontSize: 18 },
  orderMeta: { flex: 1 },
  orderRestaurant: { fontSize: 14, fontWeight: "700" },
  orderDate: { fontSize: 11, marginTop: 1 },
  orderItems: { fontSize: 12, marginBottom: 10 },
  orderActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  orderPrice: { fontSize: 14, fontWeight: "800" },
  reorderButton: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  reorderText: { fontSize: 12, fontWeight: "700" },
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  cardPressed: { transform: [{ scale: 0.98 }], opacity: 0.95 },
  imageBox: { height: 140, position: "relative", overflow: "hidden" },
  restaurantImage: { width: "100%", height: "100%" },
  tagBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 2,
  },
  tagText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  cardInfo: { padding: 14 },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: { fontSize: 16, fontWeight: "800", flex: 1, marginRight: 6 },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: { fontSize: 12, fontWeight: "700" },
  metaSubtext: { fontSize: 13, fontWeight: "500", marginBottom: 10 },
  logisticRow: {
    flexDirection: "row",
    gap: 14,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  logisticItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  logisticText: { fontSize: 12, fontWeight: "600" },
});
