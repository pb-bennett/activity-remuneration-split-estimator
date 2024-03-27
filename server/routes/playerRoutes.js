const express = require("express");
const router = express.Router();
const { getCharacters } = require("../controllers/playersController");

router.get("/characters", getCharacters);

module.exports = router;
