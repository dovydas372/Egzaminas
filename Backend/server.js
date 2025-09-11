import express from "express";
import dotenv from "dotenv";
import consoleRoutes from "./routes/consoleRoutes.js";
import reservationRoutes from "./routes/reservationsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();

//connect to DB
mongoose.connect(process.env.DB_URI).then(() => {
  //Listening on port
  app.listen(process.env.PORT, () => {
    console.log("ok, server runing");
  });
});

//middleware
app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.json({ mssg: "Sveiki!" });
});
app.use("/api/auth", authRoutes);
app.use("/api/console", consoleRoutes);
app.use("/api/reservation", reservationRoutes);
