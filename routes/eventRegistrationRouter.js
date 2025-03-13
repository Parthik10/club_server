const express = require("express");
const {
    registerForEvent,
    getRegistrations,
    getRegistrationById,
    updateRegistration,
    deleteRegistration
} = require("../controllers/eventRegistrationController.js");

const router = express.Router();

router.post("/", registerForEvent);
router.get("/", getRegistrations);
router.get("/:id", getRegistrationById);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;