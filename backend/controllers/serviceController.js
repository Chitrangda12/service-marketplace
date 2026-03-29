const Service = require("../models/Service");

// CREATE SERVICE
const createService = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const service = await Service.create({
      title,
      description,
      price,
      provider: req.user.id,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL SERVICES
const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createService, getServices };