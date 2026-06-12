import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { RESTAURANTS, MENU_ITEMS } from "../../constants/restaurants";
import { Ionicons } from "@expo/vector-icons";

export default function RestaurantDetailScreen({ route, navigation }: any) {
  const { restaurantId } = route.params;
  const { addToCart, items: cartItems, totalItems, cartTotal } = useCart();
  const { colors, mode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
  const menuList = MENU_ITEMS[restaurantId] || [];

  if (!restaurant) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.bg }]}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          Restaurant not found
        </Text>
      </View>
    );
  }

  const categories = [
    "All",
    ...Array.from(new Set(menuList.map((item) => item.category))),
  ];
  const filteredMenu =
    selectedCategory === "All"
      ? menuList
      : menuList.filter((item) => item.category === selectedCategory);

  const getItemQuantity = (id: string) => {
    const item = cartItems.find((ci) => ci.id === id);
    return item ? item.quantity : 0;
  };

  const renderHeader = () => (
    <View style={[styles.headerContainer, { backgroundColor: colors.bg }]}>
      <View style={[styles.heroBanner, { backgroundColor: colors.bgElevated }]}>
        <Image
          source={restaurant?.image}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View
          style={[styles.statusTag, { backgroundColor: restaurant?.tagColor }]}
        >
          <Text style={styles.statusTagText}>{restaurant?.tag}</Text>
        </View>
      </View>

      <View
        style={[
          styles.infoCard,
          { backgroundColor: colors.bgCard, borderColor: colors.border },
        ]}
      >
        <View style={styles.titleRow}>
          <Text style={[styles.restaurantName, { color: colors.textPrimary }]}>
            {restaurant?.name}
          </Text>
          <View
            style={[
              styles.ratingBox,
              { backgroundColor: mode === "dark" ? "#2B2211" : "#FFF9E6" },
            ]}
          >
            <Ionicons name="star" size={14} color="#FFB000" />
            <Text style={[styles.ratingText, { color: colors.textPrimary }]}>
              {restaurant?.rating}
            </Text>
          </View>
        </View>

        <Text style={[styles.cuisineText, { color: colors.textSecondary }]}>
          {restaurant?.cuisine} • {restaurant?.priceRange}
        </Text>
        <View
          style={[styles.divider, { backgroundColor: colors.borderLight }]}
        />

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={[styles.statVal, { color: colors.textPrimary }]}>
              {restaurant?.deliveryTime}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="bicycle-outline" size={16} color={colors.primary} />
            <Text style={[styles.statVal, { color: colors.textPrimary }]}>
              {restaurant?.deliveryFee === 0
                ? "Free"
                : `₹${restaurant?.deliveryFee?.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="wallet-outline" size={16} color={colors.primary} />
            <Text style={[styles.statVal, { color: colors.textPrimary }]}>
              Min. ₹{restaurant?.minOrder?.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.chip,
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
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.textSecondary },
                    isSelected && { color: "#FFFFFF" },
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.bg}
      />

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const qty = getItemQuantity(item.id);
          return (
            <View
              style={[
                styles.menuItemCard,
                { backgroundColor: colors.bgCard, borderColor: colors.border },
              ]}
            >
              <View style={styles.menuItemDetails}>
                <Text style={[styles.itemName, { color: colors.textPrimary }]}>
                  {item.emoji} {item.name}
                </Text>
                <Text
                  style={[styles.itemDesc, { color: colors.textMuted }]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
                <Text style={[styles.itemPrice, { color: colors.primary }]}>
                  ₹{item.price.toFixed(2)}
                </Text>
              </View>

              <View style={styles.actionBlock}>
                {qty > 0 ? (
                  <View
                    style={[
                      styles.counterIndicator,
                      { backgroundColor: colors.bgElevated },
                    ]}
                  >
                    <Text
                      style={[styles.counterText, { color: colors.primary }]}
                    >
                      {qty} in cart
                    </Text>
                  </View>
                ) : (
                  <Pressable
                    style={[
                      styles.addButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    }
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                  </Pressable>
                )}
              </View>
            </View>
          );
        }}
      />

      <View
        style={[
          styles.floatingCartWrapper,
          { shadowColor: mode === "dark" ? "#000" : colors.primary },
        ]}
      >
        <Pressable
          style={[
            styles.cartButton,
            { backgroundColor: colors.primary },
            totalItems === 0 && {
              backgroundColor: mode === "dark" ? "#333" : "#A0A0A0",
              opacity: 0.8,
            },
          ]}
          onPress={() => navigation.navigate("Cart")}
        >
          <View style={styles.cartLeft}>
            <View
              style={[
                styles.badgeCount,
                { backgroundColor: "rgba(255,255,255,0.2)" },
              ]}
            >
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
            <Text style={styles.viewCartText}>
              {totalItems > 0 ? "View Basket" : "Your Basket is Empty"}
            </Text>
          </View>
          <View style={styles.cartRight}>
            <Text style={styles.cartTotalText}>₹{cartTotal.toFixed(2)}</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 16, fontWeight: "600" },
  listContainer: { paddingBottom: 100 },
  headerContainer: {},
  heroBanner: { height: 150, position: "relative", overflow: "hidden" },
  heroImage: { width: "100%", height: "100%" },
  statusTag: {
    position: "absolute",
    bottom: 34,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 2,
  },
  statusTagText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  infoCard: {
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 3,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantName: { fontSize: 20, fontWeight: "800", flex: 1, marginRight: 8 },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: { fontSize: 12, fontWeight: "700" },
  cuisineText: { fontSize: 13, fontWeight: "500", marginTop: 2 },
  divider: { height: 1, marginVertical: 12 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  statVal: { fontSize: 13, fontWeight: "700" },
  categorySection: { marginTop: 16, marginBottom: 8 },
  categoryScroll: { paddingHorizontal: 16, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipActive: { borderColor: "transparent" },
  chipText: { fontSize: 13, fontWeight: "700" },
  menuItemCard: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  menuItemDetails: { flex: 1, paddingRight: 8 },
  itemName: { fontSize: 15, fontWeight: "700", marginBottom: 2 },
  itemDesc: { fontSize: 12, lineHeight: 16, marginBottom: 6 },
  itemPrice: { fontSize: 14, fontWeight: "800" },
  actionBlock: { justifyContent: "center" },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  counterIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  counterText: { fontSize: 11, fontWeight: "700" },
  floatingCartWrapper: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cartButton: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  cartLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  badgeCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  viewCartText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  cartRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  cartTotalText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
});
