import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export default function HelpScreen() {
  const { colors, mode } = useTheme();
  const FAQS = [
    "How do I cancel my live food order?",
    "What should I do if my food is delayed?",
    "How can I apply a promo code?",
    "Can I change my delivery address post-order?",
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.bg}
      />

      <Text style={[styles.infoTitle, { color: colors.textSecondary }]}>
        Contact Customer Support
      </Text>
      <Pressable
        style={[
          styles.supportBox,
          { backgroundColor: colors.bgCard, borderColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.supportIconCircle,
            { backgroundColor: colors.bgElevated },
          ]}
        >
          <Ionicons name="chatbubbles" size={22} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.supportHeading, { color: colors.textPrimary }]}>
            Live Support Chat
          </Text>
          <Text style={[styles.supportSub, { color: colors.textMuted }]}>
            Connect instantly with our support team 24/7
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      </Pressable>

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        Frequently Asked Questions
      </Text>
      <View
        style={[
          styles.faqCard,
          { backgroundColor: colors.bgCard, borderColor: colors.border },
        ]}
      >
        {FAQS.map((faq, index) => (
          <View key={index}>
            <Pressable style={styles.faqRow}>
              <Text
                style={[styles.faqText, { color: colors.textPrimary }]}
                numberOfLines={1}
              >
                {faq}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.textMuted}
              />
            </Pressable>
            {index < FAQS.length - 1 && (
              <View
                style={[
                  styles.divider,
                  { backgroundColor: colors.borderLight },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  infoTitle: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 10,
    paddingLeft: 4,
  },
  supportBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
    marginBottom: 20,
  },
  supportIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  supportHeading: { fontSize: 15, fontWeight: "800", marginBottom: 2 },
  supportSub: { fontSize: 12, lineHeight: 16, fontWeight: "500" },
  faqCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 30,
  },
  faqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  faqText: { fontSize: 14, fontWeight: "700", flex: 1, marginRight: 8 },
  divider: { height: 1 },
});
