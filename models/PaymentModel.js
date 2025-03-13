const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    transactionId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

module.exports = Payment;