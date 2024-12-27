import express from "express";
import AuthRoutes from "./authRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv"

const app = express();

dotenv.config();

app.use(express.json())

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Server is running. . . . . .",
  });
});

app.use("/auth", AuthRoutes);

// MongoDB connection using IIFE
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to db: ${mongoose.connection.host}`);
})();

app.listen(8000, () => {
  console.log(`http://localhost:${8000}`);
});
