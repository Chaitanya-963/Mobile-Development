import { StyleSheet, TextInput } from "react-native";
import React from "react";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  theme: any;
}

const SearchBar = ({ value, onChangeText, theme }: SearchBarProps) => {
  return (
    <TextInput
      placeholder="Search notes......"
      placeholderTextColor={theme.secondaryText}
      value={value}
      onChangeText={onChangeText}
      style={[
        styles.input,
        {
          backgroundColor: theme.input,
          borderColor: theme.border,
          color: theme.text,
        },
      ]}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 10,
    fontSize: 16,
  },
});
