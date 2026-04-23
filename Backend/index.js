import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import bookRoute from "./routes/book.route.js"; // ✅ ADD THIS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/user", userRoute);
app.use("/book", bookRoute); // ✅ ADD THIS

app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("DB Error:", err));