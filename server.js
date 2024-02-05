import express from "express";
import color from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { Model } from "mongoose";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import JWT from "jsonwebtoken";
import cors from "cors";

//  config dotenv
dotenv.config(); //We can give path in config

//database config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

// Routers
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.send("<h1>WEbsite is building</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.bgCyan.black);
});

//
