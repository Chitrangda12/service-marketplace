const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, createBooking);

router.get("/my", protect, getMyBookings);

router.get("/provider", protect, authorizeRoles("provider"), getProviderBookings);

router.put("/:id", protect, authorizeRoles("provider"), updateBookingStatus);

module.exports = router;
