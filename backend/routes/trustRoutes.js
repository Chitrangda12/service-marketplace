const express = require("express");
const router = express.Router();

const { getProviderTrustScore } = require("../controllers/trustController");

router.get("/provider/:providerId", getProviderTrustScore);

module.exports = router;