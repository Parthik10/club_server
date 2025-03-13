const express = require("express");
const { register, login, getClubs } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/clubs", getClubs); // Added route for fetching all clubs

module.exports = router;
