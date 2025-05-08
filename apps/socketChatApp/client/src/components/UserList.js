import { useCallback } from "react";

export default function UserList({ users, selectedUser, setSelectedUser }) {
  const renderUsers = useCallback(
    () =>
      users.map((user, idx) => {
        return (
          <li
            className={selectedUser === user.userId ? "highlightUser" : ""}
            key={user.userId}
            onClick={() => setSelectedUser(user.userId)}
          >
            <span>
              {user.userName} {idx === 0 && "(you)"}
            </span>
            <span className="smallText">
              {user.connected ? "🟢 online" : "🔴 offline"}
            </span>
          </li>
        );
      }),
    [selectedUser, setSelectedUser, users]
  );

  return (
    <aside>
      <h2>Users</h2>
      <ul>{renderUsers()}</ul>
    </aside>
  );
}
