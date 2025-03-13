const mongoose = require("mongoose");

const registerClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    clubName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    clubHead: { type: String, required: true },
    logo: { type: String }
  },
  { timestamps: true }
);

const RegisterClub = mongoose.models.RegisterClub || mongoose.model("RegisterClub", registerClubSchema);

module.exports = RegisterClub;
