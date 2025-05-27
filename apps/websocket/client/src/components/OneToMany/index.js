import { useState, useCallback } from 'react';
import { socket } from '../../socket';

const OneToMany = () => {
  const [usersNumber, setUsersNumber] = useState(0);
  const [userNameInput, setUserNameInput] = useState('');
  const [userName, setUserName] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);

  socket.on('liveUsers', (data) => {
    setUsersNumber(data.usersNumber);
  });

  socket.on('connectedUsers', (users) => {
    setConnectedUsers(users);
  });

  const submitUserName = useCallback(
    (e) => {
      e.preventDefault();
      setUserName(userNameInput);
      setUserNameInput('');
      socket.emit('newUser', userNameInput);
    },
    [userNameInput]
  );

  const sendLike = useCallback((e, recipient, sender) => {
    e.preventDefault();
    socket.emit('like', recipient, sender);
  }, []);

  return (
    <div>
      <p>Number of users connected: {usersNumber}</p>
      {!userName && (
        <form onSubmit={submitUserName}>
          <label>
            Enter your name:
            <input
              onChange={(e) => setUserNameInput(e.target.value)}
              value={userNameInput}
            ></input>
          </label>
          <button>Submit</button>
        </form>
      )}
      <p>Your name is: {userName}</p>

      <section>
        <h1>All the users connected</h1>
        {connectedUsers.map((user) => {
          return (
            user.name && (
              <div key={user.id}>
                <p>{user.name}</p>
                <p>
                  {user.likedBy.length > 0 && `Liked by: ${[...user.likedBy]}`}
                </p>
                <button onClick={(e) => sendLike(e, user.name, userName)}>
                  Send Like
                </button>
              </div>
            )
          );
        })}
      </section>
    </div>
  );
};

export default OneToMany;
