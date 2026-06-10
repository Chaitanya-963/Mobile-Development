import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.78; // 78% width allows the next product to peek out subtly

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  tag: string;
  tagColor: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const products: Product[] = [
    {
      id: 1,
      name: "Studio Headphones Pro",
      price: "$249.00",
      category: "Audio",
      tag: "Best Seller",
      tagColor: "#f59e0b",
    },
    {
      id: 2,
      name: "Minimalist Mechanical Keyboard",
      price: "$189.00",
      category: "Peripherals",
      tag: "New",
      tagColor: "#3b82f6",
    },
    {
      id: 3,
      name: "Anodized Aluminum Desk Mat",
      price: "$75.00",
      category: "Desk Setup",
      tag: "Limited Stock",
      tagColor: "#ef4444",
    },
    {
      id: 4,
      name: "MagSafe Charging Stand",
      price: "$59.00",
      category: "Accessories",
      tag: "Sale",
      tagColor: "#10b981",
    },
  ];

  const renderProductItem = ({ item }: { item: Product }) => (
    <Pressable
      style={({ pressed }) => [
        styles.productCard,
        pressed && styles.cardPressed,
      ]}
      onPress={() =>
        navigation.navigate("Details", { productId: item.id })
      }
    >
      <View style={styles.imagePlaceholder}>
        <View style={[styles.tagBadge, { backgroundColor: item.tagColor }]}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
        <Text style={styles.imageTextPlaceholder}>📦 Image</Text>
      </View>
      <Text style={styles.productCategory}>{item.category}</Text>
      <Text style={styles.productName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Block */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.username}>Chaitanya ✨</Text>
          </View>
          <Pressable
            style={styles.profileBadgePlaceholder}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.profileText}>👤 Account</Text>
          </Pressable>
        </View>

        {/* Hero Promotion Card */}
        <View style={styles.promoCard}>
          <Text style={styles.promoLabel}>LIMITED SEASON OFFER</Text>
          <Text style={styles.promoAmount}>25% OFF ALL GEAR</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>⚡ Use Code: TECH25</Text>
            <Text style={styles.statsText}>📦 Free Shipping</Text>
          </View>
        </View>

        {/* Section Header */}
        <Text style={styles.sectionTitle}>Featured Flash Deals</Text>

        {/* 🌟 Optimized Horizontal FlatList Slider */}
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16} // Matches card width + gap layout spacing
          decelerationRate="fast"
          contentContainerStyle={styles.horizontalTrackStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  scrollContent: { paddingVertical: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  greeting: { fontSize: 14, color: "#a1a1aa" },
  username: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  profileBadgePlaceholder: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#27272a",
    borderWidth: 1,
    borderColor: "#3f3f46",
  },
  profileText: { color: "#ffffff", fontWeight: "600", fontSize: 13 },
  promoCard: {
    backgroundColor: "#18181b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#27272a",
    marginHorizontal: 20,
  },
  promoLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#a1a1aa",
    letterSpacing: 1,
  },
  promoAmount: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
    marginVertical: 8,
    letterSpacing: -1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  statsText: { fontSize: 13, color: "#d4d4d8", fontWeight: "500" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
    letterSpacing: -0.3,
    paddingHorizontal: 20,
  },

  // Horizontal Slider Mechanics
  horizontalTrackStyle: { paddingHorizontal: 20, paddingBottom: 10 },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: "#18181b",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#27272a",
    marginRight: 16, // Clean spacing spacing between individual slider elements
  },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  imagePlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#27272a",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 12,
  },
  imageTextPlaceholder: { color: "#71717a", fontSize: 12 },
  tagBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  tagText: { color: "#ffffff", fontSize: 10, fontWeight: "700" },
  productCategory: {
    fontSize: 11,
    color: "#71717a",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 4,
    marginBottom: 2,
  },
  productPrice: { fontSize: 16, fontWeight: "700", color: "#ffffff" },
});
