import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

const { height } = Dimensions.get("window");

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
      tag: "Materials",
    },
    {
      id: "B",
      title: "Weatherproof Guard Tech",
      status: "Water-Resistant",
      tag: "Performance",
    },
    {
      id: "C",
      title: "Reinforced Heavy Stitching",
      status: "Lifetime Warranty",
      tag: "Craftsmanship",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Sleek Minimalist Top Navigation Header Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Artifact {productId}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Full-bleed Minimalist Image Canvas Area Frame */}
        <View style={styles.imageCanvas}>
          <Text style={styles.canvasText}>Visual Framework</Text>
        </View>

        {/* Product Identity Typography Stack */}
        <View style={styles.metaContainer}>
          <Text style={styles.productName}>Minimalist Tech Shell</Text>
          <Text style={styles.productPrice}>$189.00</Text>
        </View>

        <Text style={styles.productDescription}>
          An all-weather protective garment engineered from sustainable
          matrices. Built to handle rough operational environments without
          sacrificing internal structural breathability.
        </Text>

        {/* Framing-free Size Variant Matrix Selector */}
        <Text style={styles.sectionSubtitle}>Dimension</Text>
        <View style={styles.sizeTrack}>
          {sizes.map((size) => (
            <Pressable
              key={size}
              style={[
                styles.sizeOption,
                selectedSize === size && styles.sizeOptionActive,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextActive,
                ]}
              >
                {size}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Elegant Linework Specification Lists */}
        <Text style={styles.sectionSubtitle}>Specifications</Text>
        <View style={styles.specContainer}>
          {specifications.map((spec) => (
            <View key={spec.id} style={styles.specRow}>
              <View style={styles.specLeft}>
                <Text style={styles.specTitle}>{spec.title}</Text>
                <Text style={styles.specTag}>{spec.tag}</Text>
              </View>
              <Text style={styles.specStatus}>{spec.status}</Text>
            </View>
          ))}
        </View>

        {/* Primary Borderless Button System */}
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.btnPressed,
          ]}
          onPress={() => {
            Alert.alert(
              "Success",
              `Added size ${selectedSize} to your selection bundle.`,
            );
            navigation.navigate("Profile");
          }}
        >
          <Text style={styles.actionButtonText}>Add to Bundle</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreens;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: { width: 40 },
  backButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  topBarTitle: {
    color: "#52525b",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  scrollContent: { paddingBottom: 40 },
  imageCanvas: {
    width: "100%",
    height: height * 0.45,
    backgroundColor: "#0b0b0c",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#121214",
  },
  canvasText: {
    color: "#3f3f46",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  metaContainer: {
    paddingHorizontal: 24,
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  productName: {
    fontSize: 20,
    fontWeight: "300",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  productPrice: { fontSize: 16, fontWeight: "400", color: "#a1a1aa" },
  productDescription: {
    fontSize: 13,
    color: "#71717a",
    lineHeight: 22,
    marginTop: 16,
    paddingHorizontal: 24,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 36,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sizeTrack: { flexDirection: "row", gap: 24, paddingHorizontal: 24 },
  sizeOption: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  sizeOptionActive: { borderBottomColor: "#ffffff" },
  sizeText: { color: "#52525b", fontSize: 13, fontWeight: "500" },
  sizeTextActive: { color: "#ffffff" },
  specContainer: { paddingHorizontal: 24 },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#121214",
  },
  specLeft: { gap: 4 },
  specTitle: { fontSize: 13, color: "#e4e4e7", fontWeight: "400" },
  specTag: { fontSize: 11, color: "#52525b" },
  specStatus: { fontSize: 12, color: "#a1a1aa", fontWeight: "500" },
  actionButton: {
    backgroundColor: "#ffffff",
    marginHorizontal: 24,
    height: 52,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  btnPressed: { opacity: 0.8 },
  actionButtonText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
