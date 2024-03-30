const fs = require("fs").promises;
const path = require("path");

const Player = require("../models/playerModel");

const { checkFileExists } = require("./controllerUtils");

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    // console.log(players);

    // Check if players data is empty
    if (!players || players.length === 0) {
      const newError = new Error(`No players found in data source: ${filePath}`);
      newError.statusCode = 404; // Set custom status code
      throw newError;
    }
    // Set response headers and send response
    res.status(200).json({ result: "success", players });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors

    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};
exports.getPlayer = async (req, res) => {
  try {
    const filePath = path.resolve(process.env.PLAYERS_DATA_FILEPATH);

    // Check if the file exists
    await checkFileExists(filePath);
    const { result, player } = await checkPlayerExists(filePath, req.params.id);

    // Set response headers and send response
    if (result) res.status(200).json({ result: "success", player });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors

    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = req.body.player;
    // Check if player already exists
    console.log(newPlayer);
    const result = await Player.create(newPlayer);
    res.status(200).json({ result: "success", player: result });
    // const filePath = path.resolve(process.env.PLAYERS_DATA_FILEPATH);
    // // Check if the file exists
    // await checkFileExists(filePath);
    // // Read file and parse JSON
    // const { result, player, players } = await checkPlayerExists(filePath, req.body.player.playerName, true);
    // // Add player
    // if (player.length !== 0) {
    //   const newError = new Error(`Player with name ${req.body.player.playerName} already exists in data source: ${filePath}`);
    //   newError.statusCode = 409; // Conflict status code
    //   throw newError;
    // }
    // const newPlayers = [...players, req.body.player];
    // // Write updated data to file
    // await fs.writeFile(filePath, JSON.stringify(newPlayers, null, 2));
    // res.status(200).json({ result: "success", player: req.body.player });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors
    res.status(statusCode).send({ result: "fail", error: errorMessage });
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

const checkPlayerExists = async (filePath, identifier, add = false) => {
  const rawPlayers = await fs.readFile(filePath, "utf8");
  const players = JSON.parse(rawPlayers);
  const player = !add ? players.filter((p) => p.playerId === identifier) : players.filter((p) => p.playerName === identifier);
  console.log(player, add);
  // Check if player is not found

  if (!player && !add) {
    const newError = new Error(`No player found with name ${identifier} in data source: ${filePath}`);
    newError.statusCode = 404; // Not found status code
    throw newError;
  }

  if (player && add) {
    const newError = new Error(`Player with name ${identifier} already exists in data source: ${filePath}`);
    newError.statusCode = 409; // Conflict status code
    throw newError;
  }

  return { result: true, player: player[0], players };
};
