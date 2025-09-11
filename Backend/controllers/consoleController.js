import Console from "../models/console.js";

export const getAllConsoles = async (req, res) => {
  try {
    const consoles = await Console.find();
    res.json(consoles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneConsole = async (req, res) => {
  try {
    const console = await Console.findById(req.params.id);
    if (!console) {
      return res.status(404).json({ error: "Console not found" });
    }
    res.json(console);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createConsole = async (req, res) => {
  try {
    const newConsole = new Console(req.body);
    await newConsole.save();

    res.status(201).json(newConsole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editConsole = async (req, res) => {
  try {
    const updateConsole = await Console.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedConsole) {
      return res.status(404).json({ error: "Console not found" });
    }

    res.json(updateConsole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
