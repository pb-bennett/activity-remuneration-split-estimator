const express = require("express");
const router = express.Router();
const { getAllPlayers, getPlayer, updatePlayer, createPlayer } = require("../controllers/playerController");

router.get("/", getAllPlayers).get("/:id", getPlayer).put("/:id", updatePlayer).post("/", createPlayer);

module.exports = router;
