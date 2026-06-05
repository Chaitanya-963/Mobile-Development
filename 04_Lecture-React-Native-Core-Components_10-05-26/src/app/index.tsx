import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const themes = {
  light: {
    background: "#F7FAFC",
    cardBackground: "#FFFFFF",
    cardBorder: "#E2E8F0",
    titleText: "#1A202C",
    descriptionText: "#4A5568",
    diagnosticsText: "#718096",

    // Status Badges
    badgeBackground: "#EDF2F7",
    badgeText: "#4A5568",

    // Interaction Elements
    buttonInactiveBg: "#E2E8F0",
    buttonInactiveBorder: "#CBD5E0",
    buttonTextInactive: "#2D3748",
    buttonActiveBg: "#1A202C",
    buttonTextActive: "#FFFFFF",
  },
  dark: {
    background: "#121212",
    cardBackground: "rgba(255, 255, 255, 0.05)",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    titleText: "#FFFFFF",
    descriptionText: "#A0AEC0",
    diagnosticsText: "#888888",

    // Status Badges
    badgeBackground: "rgba(255, 255, 255, 0.1)",
    badgeText: "#A0AEC0",

    // Interaction Elements
    buttonInactiveBg: "rgba(255, 255, 255, 0.08)",
    buttonInactiveBorder: "rgba(255, 255, 255, 0.1)",
    buttonTextInactive: "#FFFFFF",
    buttonActiveBg: "#FFFFFF",
    buttonTextActive: "#121212",
  },
};

const HomeScreen = () => {
  const systemScheme = useColorScheme();
  const [manualDark, setManualDark] = useState<boolean | null>(null);

  const isDark = manualDark !== null ? manualDark : systemScheme === "dark";
  const theme = isDark ? themes.dark : themes.light;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        {/* Main Theme Mirror Card */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
            borderWidth: 1,
            borderRadius: 24,
            padding: 24,
            width: "100%",
            maxWidth: 400,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDark ? 0.4 : 0.05,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          {/* Header Content */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: theme.titleText,
                marginBottom: 6,
              }}
            >
              Theme Sandbox
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.descriptionText,
                lineHeight: 20,
              }}
            >
              Test your custom layout engines with live environment and manual
              override switching hooks.
            </Text>
          </View>

          {/* Configuration Status Badges */}
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 24 }}>
            <View
              style={{
                backgroundColor: theme.badgeBackground,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 99,
              }}
            >
              <Text
                style={{
                  color: theme.badgeText,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Active: {isDark ? "Dark Appearance" : "Light Appearance"}
              </Text>
            </View>
            <View
              style={{
                backgroundColor:
                  manualDark === null
                    ? "rgba(56, 161, 105, 0.15)"
                    : theme.badgeBackground,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 99,
              }}
            >
              <Text
                style={{
                  color: manualDark === null ? "#38a169" : theme.badgeText,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {manualDark === null ? "System Linked" : "Overridden"}
              </Text>
            </View>
          </View>

          {/* Theme Dynamic Selection Grid Row */}
          <View style={{ gap: 10 }}>
            {/* System Default Configuration Button */}
            <Pressable
              onPress={() => setManualDark(null)}
              style={({ pressed }) => ({
                backgroundColor:
                  manualDark === null
                    ? theme.buttonActiveBg
                    : theme.buttonInactiveBg,
                borderColor:
                  manualDark === null
                    ? "transparent"
                    : theme.buttonInactiveBorder,
                borderWidth: 1,
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  color:
                    manualDark === null
                      ? theme.buttonTextActive
                      : theme.buttonTextInactive,
                  fontWeight: "600",
                  fontSize: 15,
                }}
              >
                Use System Theme ({systemScheme})
              </Text>
            </Pressable>

            {/* Split Switcher Block for Forced Modes */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() => setManualDark(false)}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor:
                    manualDark === false
                      ? theme.buttonActiveBg
                      : theme.buttonInactiveBg,
                  borderColor:
                    manualDark === false
                      ? "transparent"
                      : theme.buttonInactiveBorder,
                  borderWidth: 1,
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: "center",
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text
                  style={{
                    color:
                      manualDark === false
                        ? theme.buttonTextActive
                        : theme.buttonTextInactive,
                    fontWeight: "600",
                  }}
                >
                  Force Light
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setManualDark(true)}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor:
                    manualDark === true
                      ? theme.buttonActiveBg
                      : theme.buttonInactiveBg,
                  borderColor:
                    manualDark === true
                      ? "transparent"
                      : theme.buttonInactiveBorder,
                  borderWidth: 1,
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: "center",
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text
                  style={{
                    color:
                      manualDark === true
                        ? theme.buttonTextActive
                        : theme.buttonTextInactive,
                    fontWeight: "600",
                  }}
                >
                  Force Dark
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Lower Engine Diagnostic Footprints */}
          <Text
            style={{
              color: theme.diagnosticsText,
              marginTop: 24,
              fontSize: 12,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Hardware Channel: {systemScheme?.toUpperCase()} | Virtual Layer:{" "}
            {isDark ? "DARK" : "LIGHT"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
