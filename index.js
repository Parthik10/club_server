require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const connectDb = require("./utils/db");
const authRouter = require("./routes/authRouter");
const clubRouter = require("./routes/clubRouter");
const eventRegistrationRouter = require("./routes/eventRegistrationRouter");
const announcementRouter = require("./routes/announcementRouter");
const eventRouter = require("./routes/eventRouter");
const paymentRouter = require("./routes/paymentRouter");
const Announcement = require("./models/AnnouncementModel");
const User = require("./models/UserModel");
const Event = require("./models/EventModel");
const Club = require("./models/ClubModel");
const EventRegistration = require("./models/EventRegistrationModel");
const Payment = require("./models/PaymentModel");

// cors
const corsOption = {
    origin : "http://localhost:5173",
    methods : "GET , POST , PUT , DELETE , PATCH ,HEAD",
    credentials: true,
}
app.use(cors(corsOption));

//middlewares
app.use(express.json()); // Ensure JSON parsing middleware is set up

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit the process with failure
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/clubs", clubRouter); // Updated route prefix
app.use("/api/event-registrations", eventRegistrationRouter); // Updated route prefix
app.use("/api/announcements", announcementRouter); // Added announcementRouter
app.use("/api/events", eventRouter); // Added eventRouter
app.use("/api/payments", paymentRouter); // Added paymentRouter

app.post("/announcements", async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).send(announcement);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/event-registrations", async (req, res) => {
  try {
    const eventRegistration = new EventRegistration(req.body);
    await eventRegistration.save();
    res.status(201).send(eventRegistration);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/payments", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to the database:", err);
});