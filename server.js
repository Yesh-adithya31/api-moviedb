import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import color from "colors"
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, replace '*' with your frontend URL in production
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/api/discover", movieRoutes);

const __dirname = path.resolve();
app.get("/", (req, res) => {
  res.send("User Services API is running....");
});

// error ~Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5003;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
