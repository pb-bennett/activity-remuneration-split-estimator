const express = require("express");
const router = express.Router();
const { getAllPlayers, getPlayer } = require("../controllers/playerController");

router.get("/", getAllPlayers).get("/:id", getPlayer);

module.exports = router;
