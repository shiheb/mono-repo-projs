import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return <h3>Welcome! <Link to="/signup">Sign up</Link> or <Link to="/signin">sign in</Link>!</h3>;
};
