import express from "express";
import dotenv from "dotenv";
import consoleRoutes from "./routes/consoleRoutes.js";
import reservationRoutes from "./routes/reservationsRoutes.js";
dotenv.config();

const app = express();

//routes
app.get("/", (req, res) => {
  res.json({ mssg: "Sveiki!" });
});
app.use("/api/console", consoleRoutes);
app.use("/api/reservation", reservationRoutes);
//Listening on port
app.listen(process.env.PORT, () => {
  console.log("ok, server runing");
});
