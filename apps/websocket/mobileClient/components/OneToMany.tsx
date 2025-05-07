import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { socket } from "./socket";
import { ThemedText } from "./ThemedText";

const OneToMany = () => {
  const [usersNumber, setUsersNumber] = useState(0);
  const [userNameInput, setUserNameInput] = useState("");
  const [userName, setUserName] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    socket.on("liveUsers", (data) => {
      setUsersNumber(data.usersNumber);
    });

    socket.on("connectedUsers", (users) => {
      setConnectedUsers(users);
    });

    return () => {
      socket.off("liveUsers");
      socket.off("connectedUsers");
    };
  }, []);

  const submitUserName = useCallback(() => {
    if (!userNameInput) return;
    setUserName(userNameInput);
    socket.emit("newUser", userNameInput);
    setUserNameInput("");
  }, [userNameInput]);

  const sendLike = useCallback(
    (recipient) => {
      if (!recipient || !userName) return;
      socket.emit("like", recipient, userName);
    },
    [userName]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text>Number of users connected: {usersNumber}</Text>
        {!userName ? (
          <View>
            <ThemedText>Please enter your name:</ThemedText>
            <TextInput
              value={userNameInput}
              onChangeText={setUserNameInput}
              placeholder="Your name"
              style={{ color: "red", backgroundColor: "white" }}
            />
            <Button title="Ok" onPress={submitUserName} />
          </View>
        ) : (
          <ThemedText>Your name is: {userName}</ThemedText>
        )}
        <ThemedText>All the users connected</ThemedText>
        {connectedUsers.map((user) => {
          if (!user.name) return null;
          return (
            <View key={user.id}>
              <ThemedText>{user.name}</ThemedText>
              {user.likedBy?.length > 0 && (
                <ThemedText>Liked by: {user.likedBy.join(", ")}</ThemedText>
              )}
              <Button title="Send Like" onPress={() => sendLike(user.name)} />
            </View>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OneToMany;
