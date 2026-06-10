import { StyleSheet,View, Text, Pressable, ViewStyle } from "react-native";
import React from "react";

interface NoteCardProps {
  note: {
    title: string;
    content: string;
    date: string;
    time?: string;
  };
  theme: any;
  onPress: () => void;
}

const NoteCard = ({ note, theme,onPress }: NoteCardProps) => {
  const dynamicCardStyle = StyleSheet.compose(styles.card, {
    backgroundColor: theme.card,
    borderColor: theme.border,
  }) as ViewStyle;
  return (
    <Pressable
    onPress={onPress}
      style={({ pressed }) => [dynamicCardStyle, pressed && styles.pressed]}
    >

      <Text style={[styles.title, { color: theme.text }]}>{note.title}</Text>


      <Text
        numberOfLines={2}
        style={[styles.content, { color: theme.secondaryText }]}
      >
        {note.content}
      </Text>

      <View style={styles.footer}>
        <Text style={[styles.timestamp, { color: theme.secondaryText }]}>
          {note.date}
        </Text>

        {note.time && (
          <Text style={[styles.timestamp, { color: theme.secondaryText }]}>
            {note.time}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  content: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timestamp: {
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.8,
  },
});
