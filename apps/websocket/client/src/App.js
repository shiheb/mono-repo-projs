import { useState, useEffect } from "react";
import { socket, URL } from "./socket";

function App() {
  const [data, setData] = useState("");
  const [usersNumber, setUsersNumber] = useState(0);

  socket.on("fromServer", (data) => {
    setData(data.date);
    setUsersNumber(data.usersNumber);
  });

  return (
    <div>
      <p>This is data received from the server: {data}</p>
      <p>Number of users connected: {usersNumber}</p>
    </div>
  );
}

export default App;
