const express = require("express");
const router = express.Router();

const { createService, getServices } = require("../controllers/serviceController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// only providers can create
router.post("/", protect, authorizeRoles("provider"), createService);

// anyone logged in can view
router.get("/", protect, getServices);

module.exports = router;