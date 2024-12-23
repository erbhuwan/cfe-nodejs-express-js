import express from "express";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Server is up and running. . . . ",
  });
});

app.get("/test", (req, res, next) => {
  try {
    throw new Error("Something went wrong");
  } catch (error) {
    next(error);
  }
});

app.use(userRoutes);

app.use(adminRoutes);

// many routes ......
// many routes ......
// many routes ......
// many routes ......
// many routes ......
// many routes ......

// not found handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "404 Not Found!",
  });
});

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});

app.listen(8000, () => {
  console.log(`Server started.`);
});
