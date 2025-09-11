import express from "express";
const router = express.Router();

// Paprasti vartotojai
router.post("/", (req, res) => {}); // kurti rezervaciją
router.get("/my-reservations", (req, res) => {}); // peržiūrėti savo rezervacijas
router.put("/:id", (req, res) => {}); // atnaujinti rezervaciją
router.delete("/:id", (req, res) => {}); // atšaukti rezervaciją

// Administratorius
router.get("/", (req, res) => {}); // peržiūrėti visas rezervacijas
router.get("/:id", (req, res) => {}); // peržiūrėti konkrečią rezervaciją
router.patch("/:id/status", (req, res) => {}); // keisti rezervacijos būseną

export default router;
