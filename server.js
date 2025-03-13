require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing routes
const announcementRouter = require("./routes/announcementRouter.js");
const eventRouter = require("./routes/eventRouter.js");
const eventRegistrationRouter = require("./routes/eventRegistrationRouter.js");
const paymentRouter = require("./routes/paymentRouter.js");
const authRouter = require("./routes/authRouter.js");

const app = express();

//cors
const corsOptions = {
    origin: [
        process.env.FRONTEND_URL, 
        "https://clubmanagement-4mhaz9u3b-parthiks-projects-66c6720a.vercel.app",
        "http://localhost:5173"
    ].filter(Boolean), // Removes undefined values
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
app.use("/api/auth", authRouter); // Ensure this line is present

// ✅ Add Root Route (Fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Club Management API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection error:", error);
    });