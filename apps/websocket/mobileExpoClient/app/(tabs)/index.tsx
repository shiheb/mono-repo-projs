import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useCallback } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { socket } from "../../components/socket";
import OneToMany from "@/components/OneToMany";

export default function HomeScreen() {
  const [data, setData] = useState("");
  const [usersNumber, setUsersNumber] = useState(0);

  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  socket.on("liveUsers", (data) => {
    setData(data.date);
    setUsersNumber(data.usersNumber);
  });
  socket.on("fromServer", (msg: string) =>
    setReceivedMessages([...receivedMessages, msg])
  );
  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("fromClient", message);
      setMessage("");
    },
    [message]
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <OneToMany />
      <ThemedView style={styles.titleContainer}>
        <ThemedText>This is data received from the server:</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>{data}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText>Number of users connected: </ThemedText>
        <ThemedText type="subtitle">{usersNumber}</ThemedText>
      </ThemedView>

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <ThemedText type="subtitle">Message</ThemedText>
            <TextInput
              multiline
              onChangeText={setMessage}
              value={message}
              placeholder="Type your message..."
              style={styles.textArea}
            />
            <Button title="Send" onPress={sendMessage} />
            <ThemedText type="subtitle">Broadcast Chat</ThemedText>
            {receivedMessages.map((msg, idx) => (
              <ThemedText key={idx}>{msg}</ThemedText>
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>
          to see changes. Press
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>
          directory. This will move the current
          <ThemedText type="defaultSemiBold">app</ThemedText> to
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  textArea: {
    color: "white",
    backgroundColor: "grey",
  },
});
