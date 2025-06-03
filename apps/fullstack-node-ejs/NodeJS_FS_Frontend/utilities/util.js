const isEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = isEmpty;
