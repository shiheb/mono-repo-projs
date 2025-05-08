import { useState } from "react";
import { socket } from "./socket";
import "./App.css";

import EnterUsername from "./components/EnterUsername";
import UserList from "./components/UserList";
import ChatMessage from "./components/ChatMessage";
import ChatList from "./components/ChatList";
import sortUsers from "./helpers/sortUsers";

function App() {
  const [userNameInput, setUserNameInput] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  console.log("all users in app: ", users);

  const [selectedUser, setSelectedUser] = useState(null);
  const [customID, setCustomID] = useState(localStorage.getItem("customID"));

  socket.on("connect_error", (err) => {
    if (err.message === "missing username") {
      setUserName("");
    }
  });

  socket.on("users", (users) => {
    console.log({ users });

    const currentUserFirst = sortUsers(users, userName);
    setUsers([...currentUserFirst]);
  });

  socket.on("user connected", (user) => {
    setUsers((currentUsers) => {
      const userIdx = currentUsers.findIndex((u) => u.userId === user.userId);
      if (userIdx === -1) {
        return [...currentUsers, user];
      } else {
        currentUsers[userIdx].userId = user.userId;
        currentUsers[userIdx].connected = user.connected;
      }
      return [...currentUsers];
    });
  });

  return (
    <div className="App">
      <UserList
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <main>
        <EnterUsername
          userName={userName}
          userNameInput={userNameInput}
          setUserNameInput={setUserNameInput}
          socket={socket}
          setUserName={setUserName}
          customID={customID}
          setCustomID={setCustomID}
        />

        <ChatList socket={socket} selectedUser={selectedUser} />

        {userName && selectedUser && (
          <ChatMessage socket={socket} selectedUser={selectedUser} />
        )}
      </main>
    </div>
  );
}

export default App;
