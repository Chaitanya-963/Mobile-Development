# React Native Components Reference

## 1. Basic Components (Text, Image, View)

Example showing how to use Text, Image (local and remote), and basic View layouts:

```jsx
 import { useState } from "react";
 import { Image, Pressable, Text, TextInput, View } from "react-native";

 export default function HomeScreen() {
 const [name, setName] = useState("");
 return (
 <View>
 <Text numberOfLines={2}>
 oribus autem officia provident fugit consequuntur. Cum, suscipit!
 </Text>

 Remote image from internet
 <Image
 source={{
   uri: "https://chaicode.com/assets/hitesh-suraj-dark-CKHA9jfT.webp",
 }}
 width={200}
 height={200}
 />

 Local image
 <Image
 source={require("@/assets/images/icon.png")}
 style={{
   height: 100,
   width: 100,
 }}
 blurRadius={30}
 />
 </View>
 );
 }
```

---

## 2. Form Components (TextInput, Button, Switch)

Example showing how to use TextInput, Button, and Switch components:

```jsx
import React, { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

// TextInput Example
const TextInputExample = () => {
  const [name, setName] = useState("");
  return (
    <TextInput
      placeholder="enter your name"
      value={name}
      onChangeText={setName}
      placeholderTextColor={"blue"}
      style={{
        borderWidth: 1,
        borderColor: "#ddd",
        marginTop: 10,
        fontSize: 24,
      }}
    />
  );
};

// Pressable/Button Example
const ButtonExample = () => {
  return (
    <Pressable
      onPress={() => alert("Button Pressed")}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#4a42d4" : "#6C63FF",
      })}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      }}
    >
      {({ pressed }) =>
        pressed ? <Text>Pressing...</Text> : <Text>Press me</Text>
      }
    </Pressable>
  );
};
```

---

## 3. ScrollView with List Items

Example showing how to use ScrollView to display multiple items with styling:

```jsx
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const ScrollViewExample = () => {
  const items = Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        alignItems: "center",
      }}
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
        onPress={() => alert("Hello world")}
      />
      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        trackColor={{ false: "#ddd", true: "#6c63ff" }}
        thumbColor={"yellow"}
      />
    </ScrollView>
  );
};

export default ScrollViewExample;

const styles = StyleSheet.create({});
```

---

## 4. FlatList with Data

Example showing how to use FlatList to render a list of items:

```jsx
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const USERS = [
  { id: "1", name: "Alice Johnson", role: "Designer" },
  { id: "2", name: "Bob Smith", role: "Developer" },
  { id: "3", name: "Carol White", role: "Manager" },
  { id: "4", name: "David Brown", role: "Developer" },
  { id: "5", name: "Eve Davis", role: "Designer" },
];

const FlatListExample = () => {
  return (
    <FlatList
      style={{
        backgroundColor: "red",
      }}
      data={USERS}
      horizontal
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, backgroundColor: "green" }}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "black" }} />
      )}
    />
  );
};

export default FlatListExample;

const styles = StyleSheet.create({});
```