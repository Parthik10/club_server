const express = require("express");
const {
    createAnnouncement,
    getAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement
} = require("../controllers/announcementController.js");

const announcementRouter = express.Router();

// Announcement Routes
announcementRouter.post("/", createAnnouncement);
announcementRouter.get("/", getAnnouncements);
announcementRouter.get("/:id", getAnnouncementById);
announcementRouter.put("/:id", updateAnnouncement);
announcementRouter.delete("/:id", deleteAnnouncement);

module.exports = announcementRouter;
