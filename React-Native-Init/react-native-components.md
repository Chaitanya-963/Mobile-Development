### Basic React Native Components

<!-- import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text numberOfLines={3} style={{ color: "red" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </Text>

      {/* Remote image */}
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3WLtrU8uHYPmtoapERYyQtO7Is-4Yw3iZQ&s",
        }}
        style={{ width: 300, height: 200 }}
      />

      {/* Local image */}
      <Image
        source={require("@/assets/images/icon.png")}
        style={{
          width: 100,
          height: 100,
        }}
        blurRadius={10}
      />
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={"blue"}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          marginTop: 10,
          padding: 9,
          borderRadius: 5,
          fontSize: 20,
        }}
      />

      <Pressable
        // onPressIn={}
        // onLongPress={}
        // onPressOut={}
        onPress={() => alert("Button Press")}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#4a42d4" : "#646fdf",
        })}
      >
        {({ pressed }) =>
          pressed ? <Text>Pressing....</Text> : <Text>Press me</Text>
        }
      </Pressable>
    </View>
  );
} -->


### ScrollView
<!--
import {
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

const HomeScreen = () => {
  const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, alignItems: "center" }}
    >
      {items.map((item) => (
        <View
          key={item}
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 10,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item}</Text>
        </View>
      ))}

      <Button
        title="Hello i am button"
        color={"green"}
        onPress={() => alert("Hello bro..")}
      />

      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        trackColor={{ false: "#ddd", true: "red" }}
        thumbColor={"black"}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
 -->


### FlatScreen
<!-- import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const USERS = [
  { id: "1", name: "Alice Johnson", role: "Designer" },
  { id: "2", name: "Bob Smith", role: "Developer" },
  { id: "3", name: "Carol White", role: "Manager" },
  { id: "4", name: "David Brown", role: "Developer" },
  { id: "5", name: "Eve Davis", role: "Designer" },
];
const HomeScreen = () => {
  return (
    <FlatList
      data={USERS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "black" }} />
      )}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
 -->
