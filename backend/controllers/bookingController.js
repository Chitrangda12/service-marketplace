const Booking = require("../models/Booking");

// CREATE BOOKING 
const Service = require("../models/Service");

const createBooking = async (req, res) => {
  try {
    const { serviceId } = req.body;

    const service = await Service.findById(serviceId);

    if (service.provider.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot book your own service",
      });
    }

    const booking = await Booking.create({
      service: serviceId,
      user: req.user.id,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("service");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "service",
        match: { provider: req.user.id }, // only my services
      })
      .populate("user", "name email");

    // remove null services 
    const filtered = bookings.filter(b => b.service !== null);

    res.json(filtered);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id).populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // only provider of that service can update
    if (booking.service.provider.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this booking",
      });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createBooking, getMyBookings, getProviderBookings, updateBookingStatus,};