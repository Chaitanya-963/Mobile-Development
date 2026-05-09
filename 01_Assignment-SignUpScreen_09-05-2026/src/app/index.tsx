import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import React from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const SignUpScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={["#061008", "#010501"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <View style={styles.logoInner}>
                  <Svg height="100%" width="100%" viewBox="0 0 24 24">
                    <Path
                      d="M19 11h-5V6a2 2 0 00-4 0v5H5a2 2 0 000 4h5v5a2 2 0 004 0v-5h5a2 2 0 000-4z"
                      fill="#C8FF00"
                    />
                  </Svg>
                </View>
              </View>
              <Text style={styles.brandTextWhite}>
                Welcome to <Text style={styles.brandName}>NovaMed</Text>
              </Text>
            </View>

            {/* Heading Section */}
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subTitle}>
                Enter your details to get started with your NovaMed health
                journey.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="#999"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.flexInput}
                  placeholder="example@mail.com"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color="#999"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.flexInput}
                  placeholder="Enter your password..."
                  secureTextEntry
                  placeholderTextColor="#999"
                />
              </View>

              <Pressable
                style={styles.signInButton}
                onPress={() => alert("Welcome to NovaMed!")}
              >
                <Text style={styles.signInText}>Sign In →</Text>
              </Pressable>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.line} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <Pressable style={styles.socialCircle}>
                <AntDesign name="google" size={24} color="#FFFFFF" />
              </Pressable>

              <Pressable style={styles.socialCircle}>
                <FontAwesome5 name="facebook" size={24} color="#FFFFFF" />
              </Pressable>

              <Pressable style={styles.socialCircle}>
                <AntDesign name="instagram" size={24} color="#FFFFFF" />
              </Pressable>

              <Pressable style={styles.socialCircle}>
                <AntDesign name="apple" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Pressable onPress={() => {}}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </Pressable>
              </View>

              <Pressable onPress={() => alert("Processing.....")}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUpScreen;



const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 25, paddingVertical: 40 },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(253, 255, 244, 0.2)",
  },
  logoInner: {
    width: 35,
    height: 35,
    shadowColor: "#C8FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  brandTextWhite: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 15,
    color: "#FFFFFF",
  },
  brandName: {
    color: "#C8FF00",
    fontWeight: "900",
  },
  headerTextContainer: { alignItems: "center", justifyContent: "center" },
  title: { color: "white", fontWeight: "bold", fontSize: 28 },
  subTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
    opacity: 0.6,
    lineHeight: 22,
  },
  form: {
    width: "100%",
    marginTop: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "rgba(255, 255, 255, 0.76)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  icon: {
    marginRight: 5,
  },
  flexInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#ffffff",
  },
  signInButton: {
    height: 55,
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#C8FF00",
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#C8FF00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: { flex: 1, height: 0.4, backgroundColor: "#989898" },
  dividerText: { marginHorizontal: 14, color: "#d6d6d6", fontSize: 14 },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15, // Reduced gap to fit 4 icons
    marginTop: 30,
  },
  socialCircle: {
    width: 50, // Slightly smaller for 4 icons
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    justifyContent: "center",
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.6)", 
    textAlign: "center",
  },
  signUpLink: {
    fontWeight: "bold",
    color: "#C8FF00",
    marginLeft: 5, 
  },
  forgotPassword: {
    textAlign: "right",
    color: "#C8FF00",
    fontWeight: "600",
    marginTop: 10,
  },
});
