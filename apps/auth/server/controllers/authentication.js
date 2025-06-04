const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token

  res.send({ token: tokenForUser(req.user) });
}

exports.signup = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({ email, password });

    await user.save();

    res.json({ token: tokenForUser(user) });
  } catch (err) {
    return next(err);
  }
};
