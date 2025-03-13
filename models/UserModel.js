const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} }, 
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false }
);

// Avoid model overwrite error
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
