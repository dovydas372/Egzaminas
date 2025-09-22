import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import consoleRoutes from "./routes/consoleRoutes.js";
import reservationRoutes from "./routes/reservationsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/authMiddleware.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // jei siunčiami cookie ar auth info
  })
);

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.json({ mssg: "Sveiki!" });
});
app.use("/api/auth", authRoutes);
//routes only for users
// app.use(authMiddleware);
app.use("/api/console", consoleRoutes);
app.use("/api/reservation", reservationRoutes);

//connect to DB
mongoose.connect(process.env.DB_URI).then(() => {
  //Listening on port
  app.listen(process.env.PORT, () => {
    console.log("ok, server runing on port: " + process.env.PORT);
  });
});
