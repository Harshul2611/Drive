const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    uniquie: true,
    required: true,
    trim: true,
    lowercase: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: [13, "Email must be at least 13 characters long"],
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Password must be at least 5 characters long"],
  },
});

const user = model("user", userSchema);

module.exports = user;
