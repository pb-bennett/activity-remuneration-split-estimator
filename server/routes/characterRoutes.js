const express = require("express");
const router = express.Router();
const { getAllCharacters, updateCharacterFromSource } = require("../controllers/characterController");

router.route("/").get(getAllCharacters);

router.route("/update-db").post(updateCharacterFromSource);

module.exports = router;
