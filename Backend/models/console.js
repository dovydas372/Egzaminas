import mongoose from "mongoose";

const consoleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["paskelbta", "juodraštis"],
      default: "juodraštis",
    },
    image: { type: String },
  },
  { timestamps: true }
);
