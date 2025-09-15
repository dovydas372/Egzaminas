import express from "express";
import * as reservationController from "../controllers/reservationController";
const router = express.Router();

// Paprasti vartotojai
router.post("/create", reservationController.createReservation); // kurti rezervaciją
router.get("/my-reservations", reservationController.getMyReservations); // peržiūrėti savo rezervacijas
router.put("/:id", reservationController.updateReservation); // atnaujinti rezervaciją
router.delete("/:id", reservationController.deleteReservation); // atšaukti rezervaciją

// Administratorius
router.get("/all", reservationController.getAllReservations); // peržiūrėti visas rezervacijas
router.get("/:id", reservationController.getReservationById); // peržiūrėti konkrečią rezervaciją
router.patch("/:id/status", reservationController.changeReservationStatus); // keisti rezervacijos būseną

export default router;
