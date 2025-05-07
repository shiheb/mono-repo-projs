import { useState, useCallback } from "react";
import { socket } from "./socket";
import OneToMany from "./components/OneToMany";

function App() {
  const [data, setData] = useState("");
  const [usersNumber, setUsersNumber] = useState(0);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  socket.on("liveUsers", (data) => {
    setData(data.date);
    setUsersNumber(data.usersNumber);
  });

  socket.on("fromServer", (msg) =>
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
    <div>
      <OneToMany />
      <p>This is data received from the server: {data}</p>
      <p>Number of users connected: {usersNumber}</p>
      <form onSubmit={sendMessage}>
        <label>
          Message
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </label>
        <button>Send</button>
      </form>
      {receivedMessages.map((msg, idx) => (
        <p key={`${idx}-${msg}`}>{msg}</p>
      ))}
    </div>
  );
}
//
export default App;
