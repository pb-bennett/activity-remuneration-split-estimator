const express = require("express");
const router = express.Router();
const { getAllPlayers, getPlayer, updatePlayer, createPlayer } = require("../controllers/playerController");

router.route("/").get(getAllPlayers).post(createPlayer);
router.route("/:id").get(getPlayer).put(updatePlayer);

module.exports = router;
