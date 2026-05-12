import React, { useMemo, useState } from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
("react-native-screens/src/experimental");
import EditorScreen from "./editor";

import { darkTheme, lightTheme } from "../constants/colors";

import { notes } from "../constants/notes";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const systemTheme = useColorScheme();
  const { width } = useWindowDimensions();

  const isTablet = width > 768;
  const [search, setSearch] = useState("");
  const [isDarkMood, setIsDarkMood] = useState(systemTheme === "dark");
  const [selectedNote, setSelectedNote] = useState<any>(null);

  const theme = isDarkMood ? darkTheme : lightTheme;

  const [notesData, setNotesData] = useState(notes);

  const filteredNotes = useMemo(() => {
    return notesData.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  if (selectedNote) {
    return (
      <EditorScreen
        note={selectedNote}
        onBack={() => setSelectedNote(null)}
        onSave={(updatedNote) => {
          const isExistingNote = selectedNote.id !== null;

          if (isExistingNote) {
            setNotesData((prev) =>
              prev.map((note) =>
                note.id === selectedNote.id ? updatedNote : note,
              ),
            );
          } else {
            setNotesData((prev) => [
              {
                ...updatedNote,
                id: Date.now().toString(),
              },
              ...prev,
            ]);
          }

          setSelectedNote(null);
        }}
      />
    );
  }
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingHorizontal: isTablet ? 40 : 20,
          flex: 1,
        },
      ]}
    >
      <StatusBar style="auto" />

      <Header
        title="Notes"
        subtitle="Organize your thoughts beautifully"
        textColor={theme.text}
      />
      <SearchBar value={search} onChangeText={setSearch} theme={theme} />

      <ThemeToggle
        isDarkMode={isDarkMood}
        onToggle={setIsDarkMood}
        theme={theme}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            No notes found
          </Text>
        }
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            theme={theme}
            onPress={() => setSelectedNote(item)}
          />
        )}
      />
      <Pressable
        style={[
          styles.addButton,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={() =>
          setSelectedNote({
            id: null,
            title: "",
            content: "",
          })
        }
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 24,

    width: 64,
    height: 64,
    borderRadius: 32,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "300",
  },
});
