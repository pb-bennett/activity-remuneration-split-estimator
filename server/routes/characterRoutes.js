const express = require("express");
const router = express.Router();
const { getAllCharacters, getCharacter } = require("../controllers/characterController");

router.route("/").get(getAllCharacters);

router.route("/:id").get(getCharacter);

// router.route("/update-db").post(updateCharacterFromSource);

module.exports = router;
