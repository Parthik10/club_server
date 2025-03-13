require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing routes
const announcementRouter = require("./routes/announcementRouter.js");
const eventRouter = require("./routes/eventRouter.js");
const eventRegistrationRouter = require("./routes/eventRegistrationRouter.js");
const paymentRouter = require("./routes/paymentRouter.js");
const authRouter = require("./routes/authRouter.js"); // Import auth routes

const app = express();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173", // Change this based on frontend URL
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Use the routers
app.use("/api/announcements", announcementRouter);
app.use("/api/events", eventRouter);
app.use("/api/event-registrations", eventRegistrationRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/auth", authRouter); // Use auth routes

// Global error handler (optional)
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI; // Store in .env

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection error:", error);
    });
