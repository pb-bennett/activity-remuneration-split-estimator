const express = require("express");
const router = express.Router();
const { getCharacters, updateCharacterFromSource } = require("../controllers/characterController");

router.get("/", getCharacters);

router.route("/update-db").post(updateCharacterFromSource);

module.exports = router;
