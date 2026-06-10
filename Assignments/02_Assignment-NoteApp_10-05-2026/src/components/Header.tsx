import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
  textColor: string;
}

const Header = ({ title, subtitle, textColor }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>

      <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    opacity: 0.7,
  },
});
