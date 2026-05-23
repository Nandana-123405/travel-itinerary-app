const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 3600000, // 1 hour
  },
  used: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('PasswordReset', passwordResetSchema);