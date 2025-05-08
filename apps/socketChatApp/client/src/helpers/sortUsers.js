const sortUsers = (users, currentUser) => {
  users.sort((a, b) => {
    if (a.userName === currentUser) {
      return -1;
    }
    if (b.userName === currentUser) {
      return 1;
    }
    return 0;
  });

  return users;
};

module.exports = sortUsers;
