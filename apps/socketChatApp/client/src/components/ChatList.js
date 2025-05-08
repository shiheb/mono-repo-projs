// This component will display the chat messages between the current user and the selected user.
import React, { useEffect, useState } from "react";

export default function ChatList({ socket, selectedUser }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const handleMessage = (msg) => {
      const messageKey = msg.from === socket.id ? msg.to : msg.from;
      setMessages((currentMessages) => {
        const updatedMessages = { ...currentMessages };
        const type = msg.from === socket.id ? "to" : "from";
        if (!updatedMessages[messageKey]) {
          updatedMessages[messageKey] = [];
        }

        updatedMessages[messageKey].push({ message: msg.message, type });
        return updatedMessages;
      });
    };

    socket.on("chat message", handleMessage);
    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [socket, selectedUser]);

  const renderSelectedUserChats = () => {
    if (messages[selectedUser]) {
      return messages[selectedUser].map((msg, idx) => {
        return (
          <div key={idx}>
            {msg.type === "from" ? "From: " : "To: "}
            {msg.message}
          </div>
        );
      });
    }
    return null;
  };

  return <div>{renderSelectedUserChats()}</div>;
}
