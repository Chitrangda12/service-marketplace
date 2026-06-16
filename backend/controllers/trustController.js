const User = require("../models/User");
const Service = require("../models/Service");
const Booking = require("../models/Booking");
const Review = require("../models/Review");

const calculateProviderTrustScore = async (providerId) => {
  const providerServices = await Service.find({ provider: providerId });

  const serviceIds = providerServices.map((service) => service._id);

  const reviews = await Review.find({ service: { $in: serviceIds } });

  let averageRating = 0;

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    averageRating = totalRating / reviews.length;
  }

  const totalBookings = await Booking.countDocuments({
    service: { $in: serviceIds },
  });

  const completedBookings = await Booking.countDocuments({
    service: { $in: serviceIds },
    status: "completed",
  });

  let completionRate = 0;

  if (totalBookings > 0) {
    completionRate = (completedBookings / totalBookings) * 100;
  }

  const serviceScore = Math.min(providerServices.length * 10, 100);

  const ratingScore = (averageRating / 5) * 100;

  const trustScore =
    ratingScore * 0.5 + completionRate * 0.4 + serviceScore * 0.1;

  const finalScore = Math.round(trustScore);

  await User.findByIdAndUpdate(providerId, {
    trustScore: finalScore,
  });

  return {
    providerId,
    averageRating: Number(averageRating.toFixed(1)),
    completionRate: Number(completionRate.toFixed(1)),
    totalServices: providerServices.length,
    totalBookings,
    completedBookings,
    trustScore: finalScore,
  };
};

const getProviderTrustScore = async (req, res) => {
  try {
    const result = await calculateProviderTrustScore(req.params.providerId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  calculateProviderTrustScore,
  getProviderTrustScore,
};