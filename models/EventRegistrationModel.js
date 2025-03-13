const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    paytmStatus: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  },
  { timestamps: true }
);

const EventRegistration = mongoose.models.EventRegistration || mongoose.model("EventRegistration", eventRegistrationSchema);

module.exports = EventRegistration;