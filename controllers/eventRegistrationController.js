const EventRegistration = require("../models/EventRegistrationModel.js");
const mongoose = require("mongoose");

// Register for an event
const registerForEvent = async (req, res) => {
    try {
        const { eventId, ...rest } = req.body;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: "Invalid eventId" });
        }
        const registration = new EventRegistration({ eventId, ...rest });
        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get all registrations
const getRegistrations = async (req, res) => {
    try {
        const registrations = await EventRegistration.find();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get a single registration by ID
const getRegistrationById = async (req, res) => {
    try {
        const registration = await EventRegistration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: "Registration not found" });
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Update a registration by ID
const updateRegistration = async (req, res) => {
    try {
        const registration = await EventRegistration.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!registration) return res.status(404).json({ message: "Registration not found" });
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete a registration by ID
const deleteRegistration = async (req, res) => {
    try {
        const registration = await EventRegistration.findByIdAndDelete(req.params.id);
        if (!registration) return res.status(404).json({ message: "Registration not found" });
        res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { registerForEvent, getRegistrations, getRegistrationById, updateRegistration, deleteRegistration };