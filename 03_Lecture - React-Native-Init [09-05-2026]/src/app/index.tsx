import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  Keyboard,  
  TouchableWithoutFeedback, 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // Add keyboardVerticalOffset if you have a header or tab bar
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 32, textAlign: 'center' }}>
              Welcome Back
            </Text>

            <TextInput
              placeholder="Email"
              keyboardType="email-address" // Better UX for emails
              autoCapitalize="none"
              style={inputStyle}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={inputStyle}
            />

            <Pressable
              onPress={() => console.log("Sign In Pressed")}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#514ac9" : "#6C63FF", // Visual feedback
                  padding: 16,
                  borderRadius: 12,
                  alignItems: "center",
                  marginTop: 10,
                },
              ]}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  padding: 14,
  fontSize: 16,
  marginBottom: 12,
  backgroundColor: '#fff'
};


