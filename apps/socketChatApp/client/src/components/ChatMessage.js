import React, { useState } from "react";

export default function ChatMessage({ socket, selectedUser }) {
  const [message, setMessage] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat message", { message, to: selectedUser, from: socket.id });
    setMessage("");
  };

  return (
    <div style={{ position: "relative", height: "75%" }}>
      <form onSubmit={sendMessage} style={styles.chatMessage}>
        <textarea
          placeholder={"Your message..."}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          style={styles.messageInput}
        ></textarea>
        <button style={styles.sendButton}>Send</button>
      </form>
    </div>
  );
}
// styles
const styles = {
  chatMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    height: "25%",
    backgroundColor: "#d7c3f7",
    position: "fixed",
    bottom: 0,
    right: 0,
    padding: "0 5%",
    boxSizing: "border-box",
  },
  messageInput: {
    width: "100%",
    height: "50%",
    margin: "10px",
    border: "none",
    borderRadius: "5px",
  },
  sendButton: {
    width: "10%",
    height: "20%",
    margin: "10px 0px",
    border: "none",
    alignSelf: "end",
    borderRadius: "5px",
    backgroundColor: "#b1a7f6",
  },
};
