const Announcement = require("../models/AnnouncementModel.js");

// Create a new announcement
const createAnnouncement = async (req, res) => {
    try {
        const announcement = new Announcement(req.body);
        await announcement.save();
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get all announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get a single announcement by ID
const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) return res.status(404).json({ message: "Announcement not found" });
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Update an announcement by ID
const updateAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!announcement) return res.status(404).json({ message: "Announcement not found" });
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete an announcement by ID
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) return res.status(404).json({ message: "Announcement not found" });
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { createAnnouncement, getAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement };