const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// user books
router.post("/", protect, createBooking);

// user bookings
router.get("/my", protect, getMyBookings);

// provider bookings
router.get("/provider", protect, authorizeRoles("provider"), getProviderBookings);

// update booking (accept/reject)
router.put("/:id", protect, authorizeRoles("provider"), updateBookingStatus);

module.exports = router;