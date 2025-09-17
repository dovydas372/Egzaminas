import express from "express";
import * as consoleController from "../controllers/consoleController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Visi vartotojai
router.get("/", consoleController.getAllConsoles); // visos konsolės
router.get("/:id", consoleController.getOneConsole); // viena konsolė

// Administratorius
router.post("/create", adminMiddleware, consoleController.createConsole); // sukurti konsolę
router.put("/:id", adminMiddleware, consoleController.editConsole); // redaguoti konsolę
router.patch(
  "/:id/status",
  adminMiddleware,
  consoleController.changeConsoleStatus
); // keisti būseną

export default router;
