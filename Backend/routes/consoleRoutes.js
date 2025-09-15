import express from "express";
import Console from "../models/console.js";
import * as consoleController from "../controllers/consoleController.js";

const router = express.Router();

// Visi vartotojai
router.get("/", consoleController.getAllConsoles); // visos konsolės
router.get("/:id", consoleController.getOneConsole); // viena konsolė

// Administratorius
router.post("/create", consoleController.createConsole); // sukurti konsolę
router.put("/:id", consoleController.editConsole); // redaguoti konsolę
router.patch("/:id/status", consoleController.changeConsoleStatus); // keisti būseną

export default router;
