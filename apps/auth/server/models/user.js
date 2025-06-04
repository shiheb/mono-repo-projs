const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  try {
    const user = this;

    if (!user.isModified('password')) return next(); // skip if password not modified

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next();
  } catch (err) {
    next(err);
  }
});

// Add method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export model
const User = mongoose.model('user', userSchema);
module.exports = User;
