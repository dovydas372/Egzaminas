import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    consoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Console",
      required: true,
    },
    dateFrom: { type: Date, required: true }, // rezervacijos pradžia
    dateTo: { type: Date, required: true }, // rezervacijos pabaiga
    status: {
      type: String,
      enum: ["laukia patvirtinimo", "patvirtinta", "atmesta"],
      default: "laukia patvirtinimo",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
