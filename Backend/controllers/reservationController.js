import Reservation from "../models/reservation.js";

export const createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation({
      userId: req.user._id,
      consoleId: req.body.consoleId,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
    });
    const conflict = await Reservation.findOne({
      consoleId: req.body.consoleId,
      status: { $in: ["laukia patvirtinimo", "patvirtinta"] },
      $or: [
        { dateFrom: { $lte: req.body.dateTo, $gte: req.body.dateFrom } },
        { dateTo: { $lte: req.body.dateTo, $gte: req.body.dateFrom } },
        {
          dateFrom: { $lte: req.body.dateFrom },
          dateTo: { $gte: req.body.dateTo },
        },
      ],
    });

    if (conflict) {
      return res
        .status(409)
        .json({ error: "Konsolė jau rezervuota šiuo laikotarpiu" });
    }
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      userId: req.user._id,
    }).populate("consoleId", "title");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );

    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("consoleId", "title")
      .populate("userId", "username");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changeReservationStatus = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReservationsByConsoleId = async (req, res) => {
  try {
    const reservations = await Reservation.find({ consoleId: req.params.id });

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ error: "No reservations found for this console" });
    }

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
