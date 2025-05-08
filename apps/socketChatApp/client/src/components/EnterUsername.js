import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function EnterUsername({
  userName,
  customID,
  setCustomID,
  setUserNameInput,
  userNameInput,
  socket,
  setUserName,
}) {
  const submitUserName = (e) => {
    e.preventDefault();
    setUserName(userNameInput);
    const customID = userNameInput + uuid();
    localStorage.setItem("userName", userNameInput);
    localStorage.setItem("customID", customID);
    setCustomID(customID);
    connect(userNameInput, customID);
    setUserNameInput("");
  };

  const connect = (user, customID) => {
    console.log("customid in connect ", customID);
    socket.auth = { userName: user, customID };
    socket.connect();
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUserName(userName);
      connect(userName, customID);
    }
  }, []);

  return (
    <section>
      {!userName ? (
        <form onSubmit={submitUserName}>
          <label>
            <input
              onChange={(e) => {
                setUserNameInput(e.target.value);
              }}
              value={userNameInput}
            ></input>
            Please enter your name:{" "}
          </label>
          <button>Ok</button>
        </form>
      ) : (
        <h2>Logged in as: {userName}</h2>
      )}
    </section>
  );
}
