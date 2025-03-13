const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    clubName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    poster: { type: String },
    eventId: { type: String, required: true, unique: true },
    registrationFees: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

module.exports = Event;