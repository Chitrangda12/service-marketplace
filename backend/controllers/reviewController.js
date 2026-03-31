const Review = require("../models/Review");
const Booking = require("../models/Booking");

const createReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    // check if user booked this service
    const booking = await Booking.findOne({
      user: req.user.id,
      service: serviceId,
      status: "completed",
    });

    if (!booking) {
      return res.status(400).json({
        message: "You can only review after completing booking",
      });
    }

    const review = await Review.create({
      service: serviceId,
      user: req.user.id,
      rating,
      comment,
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate("user", "name");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getServiceReviews };
