const RegisterClub = require("../models/RegisterClubModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, clubName, description, clubHead, logo } = req.body;
    const existingUser = await RegisterClub.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerClub = new RegisterClub({ name, email, password: hashedPassword, clubName, description, clubHead, logo });
    await registerClub.save();

    res.status(201).json({ message: "User and club registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await RegisterClub.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getClubs = async (req, res) => {
  try {
    const clubs = await RegisterClub.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};