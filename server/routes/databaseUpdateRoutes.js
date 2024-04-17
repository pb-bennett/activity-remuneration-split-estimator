const express = require("express");
const router = express.Router();

const { updateSeatDb, updateCharacterFromSource, updatePlayerDatabase } = require("../controllers/databaseUpdateController");

router.route("/seat").post(updateSeatDb);
router.route("/eve-who").post(updateCharacterFromSource);
router.route("/player-update").post(updatePlayerDatabase);
module.exports = router;
