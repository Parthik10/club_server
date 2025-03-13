const express = require("express");
const { register, login, getClubs } = require("../controllers/authController"); // Import getClubs

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getclubs", getClubs); // Add route to get club details

module.exports = router;
