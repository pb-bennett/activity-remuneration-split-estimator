const express = require("express");
const router = express.Router();
const { getAllPlayers, getPlayer, updatePlayer, addPlayer } = require("../controllers/playerController");

router.get("/", getAllPlayers).get("/:id", getPlayer).put("/:id", updatePlayer).post("/", addPlayer);

module.exports = router;
