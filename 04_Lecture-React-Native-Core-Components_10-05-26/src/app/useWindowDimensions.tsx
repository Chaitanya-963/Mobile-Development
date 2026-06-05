import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const HomeScreen = () => {
  // Pulling all properties out of the window dimensions hook
  const { height, width, fontScale, scale } = useWindowDimensions();

  const isTablet = width >= 768;
  const isLandscape = width > height;

  const lockLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    );
  };

  const lockPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, isLandscape && styles.cardLandscape]}>
        {/* Header Section with dynamic font scale adjustment */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { fontSize: 20 * fontScale }]}>
            Screen Orientation Control
          </Text>
          <Text style={[styles.description, { fontSize: 14 * fontScale }]}>
            Forcefully lock or toggle device presentation layout.
          </Text>
        </View>

        {/* Status Indicators */}
        <View style={styles.badgeContainer}>
          <View
            style={[styles.badge, isLandscape ? styles.activeBadge : undefined]}
          >
            <Text
              style={[
                styles.badgeText,
                isLandscape ? styles.activeBadgeText : undefined,
                { fontSize: 12 * fontScale },
              ]}
            >
              {isLandscape ? "Landscape View" : "Portrait View"}
            </Text>
          </View>
          {isTablet && (
            <View style={styles.tabletBadge}>
              <Text
                style={[styles.tabletBadgeText, { fontSize: 12 * fontScale }]}
              >
                Tablet Device
              </Text>
            </View>
          )}
        </View>

        {/* Action Controls - Dynamic inline grid from snippet */}
        <View
          style={[
            styles.buttonGroup,
            isLandscape && styles.buttonGroupLandscape,
          ]}
        >
          <Pressable
            onPress={lockPortrait}
            style={({ pressed }) => [
              styles.button,
              isLandscape ? undefined : styles.buttonActive,
              isLandscape && styles.buttonLandscape,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                isLandscape
                  ? styles.buttonTextInactive
                  : styles.buttonTextActive,
                { fontSize: 15 * fontScale },
              ]}
            >
              Force Portrait
            </Text>
          </Pressable>

          <Pressable
            onPress={lockLandscape}
            style={({ pressed }) => [
              styles.button,
              isLandscape ? styles.buttonActive : undefined,
              isLandscape && styles.buttonLandscape,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                isLandscape
                  ? styles.buttonTextActive
                  : styles.buttonTextInactive,
                { fontSize: 15 * fontScale },
              ]}
            >
              Force Landscape
            </Text>
          </Pressable>
        </View>

        {/* Dynamic Diagnostics Line from your snippet */}
        <Text style={[styles.diagnosticsText, { fontSize: 12 * fontScale }]}>
          Screen: {Math.round(width)} × {Math.round(height)} (
          {isLandscape ? "Landscape" : "Portrait"}) | Scale: {scale}x
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 24,
    width: "100%",
    maxWidth: 400,
    elevation: 4,
  },
  cardLandscape: {
    maxWidth: 600,
  },
  headerSection: {
    marginBottom: 16,
  },
  title: {
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
  },
  description: {
    color: "#a0aec0",
    lineHeight: 20,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  activeBadge: {
    backgroundColor: "rgba(56, 161, 105, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(56, 161, 105, 0.4)",
  },
  badgeText: {
    color: "#a0aec0",
    fontWeight: "600",
  },
  activeBadgeText: {
    color: "#48bb78",
  },
  tabletBadge: {
    backgroundColor: "rgba(66, 153, 225, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(66, 153, 225, 0.4)",
  },
  tabletBadgeText: {
    color: "#63b3ed",
    fontWeight: "600",
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },
  buttonGroupLandscape: {
    flexDirection: "row",
  },
  button: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  buttonLandscape: {
    flex: 1,
  },
  buttonActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: "600",
  },
  buttonTextActive: {
    color: "#121212",
  },
  buttonTextInactive: {
    color: "#ffffff",
  },
  diagnosticsText: {
    color: "#888888",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "500",
  },
});
