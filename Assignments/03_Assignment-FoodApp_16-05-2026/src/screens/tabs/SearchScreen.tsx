import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RESTAURANTS, CATEGORIES } from "../../constants/restaurants";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen({ navigation }: any) {
  const { colors, mode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState("all");

  const filteredRestaurants = RESTAURANTS.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeChip === "all" ||
      restaurant.cuisine.toLowerCase() === activeChip.toLowerCase() ||
      restaurant.name.toLowerCase().includes(activeChip.toLowerCase()) ||
      (activeChip === "burgers" && restaurant.name.includes("Burger")) ||
      (activeChip === "pizza" && restaurant.name.includes("Pizza"));

    return matchesSearch && matchesCategory;
  });

  const handleChipPress = (id: string, label: string) => {
    setActiveChip(id);
    if (id === "all") {
      setSearchQuery("");
    } else {
      setSearchQuery(label);
    }
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.bg}
      />

      {/* Fixed Header Section */}
      <View style={[styles.fixedHeader, { backgroundColor: colors.bg }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Search
        </Text>

        <View
          style={[
            styles.searchBoxWrapper,
            { backgroundColor: colors.bgCard, borderColor: colors.border },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search items, cuisines, kitchens..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.textPrimary }]}
            autoFocus={false}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.textMuted}
              />
            </Pressable>
          )}
        </View>

        <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
          Recent Suggestions
        </Text>
        <View style={styles.chipsContainer}>
          {CATEGORIES.map((cat) => {
            const isSelected = activeChip === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => handleChipPress(cat.id, cat.label)}
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
                <Text style={styles.chipEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.chipLabel,
                    { color: colors.textSecondary },
                    isSelected && { color: colors.textInverse },
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
          {searchQuery.length > 0 ? "Search Results" : "Top Searches Nearby"}
        </Text>
      </View>

      {/* Main Results Feed */}
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={64}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyText, { color: colors.textPrimary }]}>
              No restaurants match your search
            </Text>
            <Text
              style={[styles.emptySubtext, { color: colors.textSecondary }]}
            >
              Try searching for 'Burger', 'Sushi', or 'Pizza' instead.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.resultCard,
              { backgroundColor: colors.bgCard, borderColor: colors.border },
            ]}
            onPress={() =>
              navigation.navigate("HomeTab", {
                screen: "RestaurantDetail",
                params: { restaurantId: item.id },
              })
            }
          >
            <View
              style={[
                styles.cardImageCircle,
                { backgroundColor: colors.bgElevated },
              ]}
            >
              <Image
                source={item.image}
                style={styles.restaurantThumbImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.cardMeta}>
              <Text style={[styles.cardName, { color: colors.textPrimary }]}>
                {item.name}
              </Text>
              <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                {item.cuisine} • {item.deliveryTime}
              </Text>
            </View>

            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#FFB000" />
              <Text style={[styles.ratingText, { color: colors.textPrimary }]}>
                {item.rating}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
  },
  searchBoxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    height: "100%",
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  cardImageCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    overflow: "hidden",
  },
  restaurantThumbImage: {
    width: "100%",
    height: "100%",
  },
  cardMeta: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 12,
    fontWeight: "500",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#22222",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
