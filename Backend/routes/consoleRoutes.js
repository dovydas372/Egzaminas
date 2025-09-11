import express from "express";
const router = express.Router();

// Visi vartotojai
router.get("/", (req, res) => {}); // visos konsolės
router.get("/:id", (req, res) => {}); // viena konsolė

// Administratorius
router.post("/", (req, res) => {}); // sukurti konsolę
router.put("/:id", (req, res) => {}); // redaguoti konsolę
router.patch("/:id/status", (req, res) => {}); // keisti būseną

export default router;
