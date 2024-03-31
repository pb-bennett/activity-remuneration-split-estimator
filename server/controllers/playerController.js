const mongoose = require("mongoose");
const Player = require("../models/playerModel");

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    if (!players || players.length === 0) {
      const newError = new Error(`No players found.`);
      newError.statusCode = 404; // Set custom status code
      throw newError;
    }
    res.status(200).json({ result: "success", players });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};
exports.getPlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    // Validate if playerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(playerId)) {
      const errorMessage = "Invalid player ID format";
      return res.status(400).json({ result: "fail", error: errorMessage });
    }
    const player = await Player.findById(playerId);
    if (!player) {
      const errorMessage = `Player with ID ${playerId} not found.`;
      return res.status(404).json({ result: "fail", error: errorMessage });
    }
    res.status(200).json({ result: "success", player });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = req.body.player;
    // console.log(newPlayer);
    const existingPlayer = await Player.findOne({ playerName: newPlayer.playerName });
    // console.log(existingPlayer);
    if (existingPlayer) {
      const errorMessage = `Player with name ${newPlayer.playerName} already exists.`;
      return res.status(404).json({ result: "fail", error: errorMessage });
    }
    // const newPlayer = req.body.player;
    const result = await Player.create(newPlayer);
    res.status(200).json({ result: "success", player: result });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors
    res.status(statusCode).send({ result: "fail", error: errorMessage, stackTrace: error.stack });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const filePath = path.resolve(process.env.PLAYERS_DATA_FILEPATH);
    // Check if the file exists
    await checkFileExists(filePath);
    // Read file and parse JSON
    const { result, player, players } = await checkPlayerExists(filePath, req.params.id);

    // Update player
    let newPlayers = players.filter((p) => p.playerId !== player.playerId);
    newPlayers = [...newPlayers, req.body.player];
    // Write updated data to file
    await fs.writeFile(filePath, JSON.stringify(newPlayers, null, 2));
    res.status(200).json({ result: "success", player: req.body.player });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors
    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};
