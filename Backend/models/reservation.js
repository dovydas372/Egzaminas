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
      enum: ["laukianti", "patvirtinta", "atmesta", "vykdoma"],
      default: "laukianti",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
