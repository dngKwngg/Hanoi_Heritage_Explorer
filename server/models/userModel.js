const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      default: "user",
    },
    dateOfBirth: {
      type: Date,
      required: false
    },
    resettoken: { 
      type: String, 
      required: false 
    },
    resettokenExpiration: { 
      type: Date, 
      required: false 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
