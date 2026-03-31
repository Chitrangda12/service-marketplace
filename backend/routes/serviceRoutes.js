const express = require("express");
const router = express.Router();

const { createService, getServices } = require("../controllers/serviceController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, authorizeRoles("provider"), createService);

router.get("/", protect, getServices);

module.exports = router;
