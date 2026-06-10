import React, { useState } from "react";

import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { darkTheme, lightTheme } from "../constants/colors";

interface EditorScreenProps {
  note: any;
  onBack: () => void;
  onSave: (updatedNote: any) => void;
}

export default function EditorScreen({
  note,
  onBack,
  onSave,
}: EditorScreenProps) {
  const systemTheme = useColorScheme();

  const theme = systemTheme === "dark" ? darkTheme : lightTheme;

  const { width } = useWindowDimensions();

  const isTablet = width > 768;

  const [title, setTitle] = useState(note?.title || "");

  const [content, setContent] = useState(note?.content || "");
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          {/* Header Image */}
          <ImageBackground
            source={require("../../assets/images/header-bg.jpeg")}
            style={[
              styles.headerImage,
              {
                height: isTablet ? 280 : 220,
              },
            ]}
            imageStyle={styles.headerImageStyle}
          >
            {/* Overlay */}
            <View style={styles.overlay}>
              {/* Top Buttons */}
              <View style={styles.topBar}>
                <Pressable
                  onPress={onBack}
                  style={({ pressed }) => [
                    styles.actionButton,
                    {
                      backgroundColor: theme.card,
                    },
                    pressed && styles.pressedButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
                    Back
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onSave({ ...note, title, content })}
                  style={({ pressed }) => [
                    styles.saveButton,
                    pressed && styles.pressedButton,
                  ]}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
              </View>

              {/* Heading */}
              <View style={styles.headerContent}>
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      fontSize: isTablet ? 34 : 28,
                    },
                  ]}
                >
                  {note?.title ? "Edit Note" : "New Note"}
                </Text>

                <Text style={styles.headerSubtitle}>Capture your thoughts</Text>
              </View>
            </View>
          </ImageBackground>

          {/* Editor Area */}
          <View
            style={[
              styles.editorContainer,
              {
                paddingHorizontal: isTablet ? 40 : 20,
              },
            ]}
          >
            {/* Title Input */}
            <TextInput
              placeholder="Note Title"
              placeholderTextColor={theme.secondaryText}
              value={title}
              onChangeText={setTitle}
              style={[
                styles.titleInput,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.border,
                  fontSize: isTablet ? 28 : 24,
                },
              ]}
            />

            {/* Content Input */}
            <TextInput
              placeholder="Start writing your note..."
              placeholderTextColor={theme.secondaryText}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              style={[
                styles.contentInput,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.border,
                  fontSize: isTablet ? 18 : 16,
                },
              ]}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    // paddingTop:40
  },

  headerImage: {
    justifyContent: "space-between",
  },

  headerImageStyle: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    opacity: 0.6,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: "space-between",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },

  saveButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 14,
  },

  pressedButton: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  headerContent: {
    marginTop: 30,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#E5E7EB",
    fontSize: 16,
    marginTop: 8,
  },

  editorContainer: {
    paddingTop: 28,
  },

  titleInput: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  contentInput: {
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 350,
    lineHeight: 28,
  },
});
