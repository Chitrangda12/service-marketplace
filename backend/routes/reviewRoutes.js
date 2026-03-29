const express = require("express");
const router = express.Router();

const { createReview, getServiceReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

// add review
router.post("/", protect, createReview);

// get reviews of a service
router.get("/:serviceId", getServiceReviews);

module.exports = router;