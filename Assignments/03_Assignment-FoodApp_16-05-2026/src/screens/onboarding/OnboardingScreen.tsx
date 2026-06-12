import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

type Props = NativeStackScreenProps<AuthStackParamList, "Onboarding">;

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: 0,
    title: "FoodBite",
    subtitle: "Delicious food from your favourite restaurants delivered right to your doorstep.",
    icon: "fast-food",
    circleColorLight: "#FFEBE3",
    circleColorDark: "#2A1D18",
  },
  {
    id: 1,
    title: "Live Tracking",
    subtitle: "Track your food orders in real-time from the restaurant kitchen straight to your home map.",
    icon: "map",
    circleColorLight: "#EBF5FF",
    circleColorDark: "#182230",
  },
  {
    id: 2,
    title: "Digital Checkout",
    subtitle: "Apply promo vouchers, save secure payment details, and complete your orders seamlessly.",
    icon: "card",
    circleColorLight: "#ECFDF5",
    circleColorDark: "#13231C",
  }
];

export default function OnboardingScreen({ navigation }: Props) {
  const { colors, mode } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    if (activeSlide < SLIDES.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      navigation.replace("Login");
    }
  };

  const currentSlide = SLIDES[activeSlide];
  const dynamicCircleBg = mode === "dark" ? currentSlide.circleColorDark : currentSlide.circleColorLight;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} backgroundColor={colors.bg} />
      
      {/* Premium Adaptive Background Geometric Mask */}
      <View style={[styles.backgroundCircle, { backgroundColor: dynamicCircleBg }]} />

      {/* Main Core Interactive Slider Presentation Content Area */}
      <View style={styles.contentContainer}>
        <View style={[styles.logoContainer, { backgroundColor: colors.bgCard, shadowColor: colors.primary }]}>
          <Ionicons 
            name={currentSlide.icon as any} 
            size={100} 
            color={activeSlide === 1 ? (colors.info || "#3B82F6") : activeSlide === 2 ? (colors.success || "#10B981") : colors.primary} 
          />
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>{currentSlide.title}</Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {currentSlide.subtitle}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        {/* Pagination Dots Controls HUD Indicator Panel */}
        <View style={styles.paginationPanel}>
          {SLIDES.map((slide) => {
            const isCurrent = activeSlide === slide.id;
            return (
              <View 
                key={slide.id} 
                style={[
                  styles.dot, 
                  { backgroundColor: mode === "dark" ? colors.border : "#D0D0D0" },
                  isCurrent && [styles.dotActive, { backgroundColor: colors.primary }]
                ]} 
              />
            );
          })}
        </View>

        {/* Dynamic Navigational Flow Actions Button Context */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, { color: colors.textInverse }]}>
            {activeSlide === SLIDES.length - 1 ? "Get Started" : "Next"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.textInverse} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  backgroundCircle: {
    position: "absolute",
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: (width * 1.5) / 2,
    top: -width * 0.6,
    alignSelf: "center",
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  logoContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 16,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    paddingBottom: 40,
    alignItems: "center",
    gap: 24,
  },
  paginationPanel: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  button: {
    flexDirection: "row",
    height: 56,
    width: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
