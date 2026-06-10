import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const SearchScreens = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const suggestedMatrices = [
    {
      label: "Chronological Artifacts",
      value: "Recent orders & historical manifests",
      code: "S1",
    },
    {
      label: "Secured Nodes",
      value: "Payment gateways & registry links",
      code: "S2",
    },
    {
      label: "Transit Coordinates",
      value: "Saved delivery matrices & hubs",
      code: "S3",
    },
  ];

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={styles.backLink}
          >
            <Text style={styles.backLinkText}>Return to Catalog</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={styles.profileBadge}
          >
            <Text style={styles.profileBadgeText}>C</Text>
          </Pressable>
        </View>

        <Text style={styles.screenTitle}>Query Registry</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search index or asset code..."
            placeholderTextColor="#3f3f46"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={handleSearchClear} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeader}>Suggested Node Directories</Text>

        <View style={styles.registryGroup}>
          {suggestedMatrices.map((opt, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.registryRow,
                pressed && styles.rowPressed,
              ]}
              onPress={() =>
                Alert.alert(
                  "Query System",
                  `Initializing localized scan for: ${opt.label}`,
                )
              }
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIndex}>{opt.code}</Text>
                <View style={styles.textStack}>
                  <Text style={styles.rowLabel}>{opt.label}</Text>
                  <Text style={styles.rowValue}>{opt.value}</Text>
                </View>
              </View>
              <Text style={styles.arrowIcon}>↗</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.systemFooter}>
        Query Module v4.12.0 · Search Nodes Cryptographically Encrypted
      </Text>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default SearchScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  backLink: {
    alignSelf: "flex-start",
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#52525b",
  },
  backLinkText: {
    color: "#a1a1aa",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  profileBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#18181b",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  profileBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  searchIdentity: {
    alignItems: "flex-start",
    marginTop: 40,
    gap: 16,
    width: "100%",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "300",
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: "#52525b",
    fontSize: 12,
  },
  scrollContainer: {
    paddingVertical: 40,
  },
  sectionHeader: {
    fontSize: 11,
    color: "#52525b",
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  registryGroup: {
    marginTop: 0,
  },
  registryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#121214",
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  rowIndex: {
    fontSize: 11,
    color: "#3f3f46",
    fontWeight: "600",
    marginTop: 3,
  },
  textStack: {
    gap: 4,
    paddingRight: 40,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#ffffff",
  },
  rowValue: {
    fontSize: 12,
    color: "#52525b",
  },
  arrowIcon: {
    color: "#3f3f46",
    fontSize: 14,
  },
  systemFooter: {
    textAlign: "center",
    fontSize: 10,
    color: "#27272a",
    letterSpacing: 0.5,
    marginTop: "auto",
    marginBottom: 10,
  },
});
