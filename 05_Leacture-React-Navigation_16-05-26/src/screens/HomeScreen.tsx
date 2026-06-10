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
// Elegant item width to create a continuous airy horizontal flow
const CARD_WIDTH = width * 0.65; 

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const products: Product[] = [
    { id: 1, name: "Studio Headphones Pro", price: "$249.00", category: "Audio" },
    { id: 2, name: "Minimalist Mechanical Keyboard", price: "$189.00", category: "Peripherals" },
    { id: 3, name: "Anodized Aluminum Desk Mat", price: "$75.00", category: "Desk Setup" },
    { id: 4, name: "MagSafe Charging Stand", price: "$59.00", category: "Accessories" },
  ];

  const renderProductItem = ({ item }: { item: Product }) => (
    <Pressable
      style={({ pressed }) => [
        styles.productCard,
        pressed && styles.cardPressed,
      ]}
      onPress={() => navigation.navigate("Details", { productId: item.id })}
    >
      {/* Asymmetric Frameless Image Block */}
      <View style={styles.imageCanvas}>
        <Text style={styles.imageLabel}>Object {item.id}</Text>
      </View>
      
      {/* Minimalist Details Stack */}
      <View style={styles.metaContainer}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Clean Typographic Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>ESSENTIALS</Text>
            <Text style={styles.brandSubtitle}>Curated collection for Chaitanya</Text>
          </View>
          <Pressable
            style={styles.profileLink}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.profileText}>Index</Text>
          </Pressable>
        </View>

        {/* Minimal Editorial Promo Frame (No background card block) */}
        <View style={styles.editorialFrame}>
          <View style={styles.hairlineDivider} />
          <Text style={styles.editorialSubtitle}>SEASONAL RELEASE</Text>
          <Text style={styles.editorialTitle}>25% off technical gear architectures.</Text>
          <Text style={styles.editorialCode}>Use structural identifier: TECH25</Text>
          <View style={styles.hairlineDivider} />
        </View>

        {/* Section Heading */}
        <Text style={styles.sectionTitle}>Featured Artifacts</Text>

        {/* Framing-free Horizontal FlatList Track */}
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 24}
          decelerationRate="fast"
          contentContainerStyle={styles.horizontalTrackStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // Ultra-pure pitch black background canvas
  container: { flex: 1, backgroundColor: "#000000" },
  scrollContent: { paddingVertical: 24 },
  
  // Header Architecture
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 44,
    paddingHorizontal: 24,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "300",
    color: "#ffffff",
    letterSpacing: 4, // Clean tracking look
  },
  brandSubtitle: {
    fontSize: 12,
    color: "#52525b",
    marginTop: 4,
    fontWeight: "400",
  },
  profileLink: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    paddingBottom: 2,
  },
  profileText: { color: "#ffffff", fontSize: 12, fontWeight: "500", letterSpacing: 1 },

  // Editorial System (Replaces the chunky promo card look)
  editorialFrame: {
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  hairlineDivider: {
    height: 1,
    backgroundColor: "#18181b",
    marginVertical: 16,
  },
  editorialSubtitle: {
    fontSize: 10,
    fontWeight: "600",
    color: "#a1a1aa",
    letterSpacing: 2,
    marginBottom: 8,
  },
  editorialTitle: {
    fontSize: 22,
    fontWeight: "300",
    color: "#ffffff",
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  editorialCode: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 12,
    fontFamily: "Platform" as any, // Monospace structure alignment placeholder
  },

  // Main Category Section Header
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 20,
    letterSpacing: 2,
    textTransform: "uppercase",
    paddingHorizontal: 24,
  },

  // Frameless Horizontal Slider Track Layout Mechanics
  horizontalTrackStyle: { paddingHorizontal: 24 },
  productCard: {
    width: CARD_WIDTH,
    marginRight: 24,
  },
  cardPressed: { opacity: 0.75 },
  imageCanvas: {
    width: "100%",
    height: 280, // Extended vertical height creates a sleek fashion/editorial look
    backgroundColor: "#0b0b0c",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#121214",
  },
  imageLabel: { color: "#3f3f46", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
  
  metaContainer: {
    marginTop: 12,
    gap: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#e4e4e7",
    letterSpacing: -0.1,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: "500",
    color: "#71717a",
  },
});
