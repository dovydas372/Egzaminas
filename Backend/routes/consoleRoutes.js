import express from "express";
import Console from "../models/console.js";
const router = express.Router();

// Visi vartotojai
router.get("/", (req, res) => {}); // visos konsolės
router.get("/:id", (req, res) => {}); // viena konsolė

// Administratorius
router.post("/create", async (req, res) => {
  try {
    const newConsole = new Console(req.body);
    await newConsole.save();
    res.status(201).json({ message: "Console created", console: newConsole });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating console", error: err.message });
  }
}); // sukurti konsolę
router.put("/:id", (req, res) => {}); // redaguoti konsolę
router.patch("/:id/status", (req, res) => {}); // keisti būseną

export default router;
