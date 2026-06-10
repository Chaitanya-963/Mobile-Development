import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

const DetailScreens = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { productId } = route.params || { productId: 1 };
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const sizes = ["S", "M", "L", "XL"];

  const specifications = [
    {
      id: "A",
      title: "Sustainable Premium Fabrics",
      status: "Eco-Certified",
      progress: "85%",
      tag: "Materials",
    },
    {
      id: "B",
      title: "Weatherproof Guard Tech",
      status: "Water-Resistant",
      progress: "95%",
      tag: "Performance",
    },
    {
      id: "C",
      title: "Reinforced Heavy Stitching",
      status: "Lifetime Warranty",
      progress: "100%",
      tag: "Craftsmanship",
    },
  ] as const;

  return (
    <SafeAreaView style={styles.container}>
      {/* Dynamic Navigation Sticky TopBar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Product Details</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Primary Product Frame Canvas */}
        <View style={styles.mediaGalleryBox}>
          <Text style={styles.mediaLabel}>
            📸 Product Visual Canvas (Selected ID: {productId})
          </Text>
        </View>

        <Text style={styles.pageTitle}>Minimalist Tech Shell</Text>
        <Text style={styles.productPrice}>$189.00</Text>

        <Text style={styles.pageDesc}>
          An all-weather protective garment engineered from sustainable
          matrices. Built to handle rough operational environments without
          sacrificing internal structural breathability.
        </Text>

        {/* Size Selection Grid Chips */}
        <Text style={styles.sectionSubtitle}>Select Size</Text>
        <View style={styles.sizeRow}>
          {sizes.map((size) => (
            <Pressable
              key={size}
              style={[
                styles.sizeChip,
                selectedSize === size && styles.sizeChipActive,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeChipText,
                  selectedSize === size && styles.sizeChipTextActive,
                ]}
              >
                {size}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Technical Characteristics Meter Grid */}
        <Text style={styles.sectionSubtitle}>Performance Specifications</Text>
        <View style={styles.gridContainer}>
          {specifications.map((spec) => (
            <View key={spec.id} style={styles.gridCard}>
              <View style={styles.tagWrapper}>
                <Text style={styles.tagText}>{spec.tag}</Text>
              </View>
              <Text style={styles.cardTitle}>{spec.title}</Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${spec.progress}` as any },
                  ]}
                />
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.statusText}>🛡️ {spec.status}</Text>
                <Text style={styles.percentText}>{spec.progress} Rated</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Call to Action Trigger */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryPurchaseButton,
            pressed && styles.btnPressed,
          ]}
          onPress={() => {
            Alert.alert("Success", `Added Size ${selectedSize} to cart!`);
            navigation.navigate("Profile");
          }}
        >
          <Text style={styles.purchaseBtnText}>Add To Shopping Cart</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreens;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#18181b",
  },
  backButton: { width: 60 },
  backButtonText: { color: "#a1a1aa", fontSize: 14, fontWeight: "600" },
  topBarTitle: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  scrollContent: { padding: 20 },
  mediaGalleryBox: {
    width: "100%",
    height: 260,
    backgroundColor: "#18181b",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#27272a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  mediaLabel: { color: "#71717a", fontSize: 14, fontWeight: "500" },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 6,
    letterSpacing: -0.3,
  },
  pageDesc: {
    fontSize: 14,
    color: "#a1a1aa",
    marginTop: 12,
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
  },
  sizeRow: { flexDirection: "row", gap: 10, marginBottom: 28 },
  sizeChip: {
    flex: 1,
    height: 46,
    backgroundColor: "#18181b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  sizeChipActive: { backgroundColor: "#ffffff", borderColor: "#ffffff" },
  sizeChipText: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  sizeChipTextActive: { color: "#000000" },
  gridContainer: { gap: 14, marginBottom: 28 },
  gridCard: {
    backgroundColor: "#18181b",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  tagWrapper: {
    alignSelf: "flex-start",
    backgroundColor: "#27272a",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  tagText: { color: "#d4d4d8", fontSize: 11, fontWeight: "600" },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 14,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#27272a",
    borderRadius: 3,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: "#ffffff", borderRadius: 3 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: { fontSize: 12, color: "#a1a1aa", fontWeight: "500" },
  percentText: { fontSize: 12, color: "#ffffff", fontWeight: "600" },
  primaryPurchaseButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  purchaseBtnText: { color: "#000000", fontWeight: "700", fontSize: 16 },
});
