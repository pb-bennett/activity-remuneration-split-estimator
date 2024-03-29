const express = require("express");
const router = express.Router();
const { getCharacters } = require("../controllers/operationController");

router.get("/", getCharacters);

module.exports = router;
