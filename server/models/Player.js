const mongoose = require("mongoose");

// Define schema for the character
const characterSchema = new mongoose.Schema({
  characterId: Number,
  name: String,
});

// Define schema for the player
const playerSchema = new mongoose.Schema({
  playerName: String,
  playerId: String,
  characterId: Number,
  characters: [characterSchema],
});

// Create a model using the schemas
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
