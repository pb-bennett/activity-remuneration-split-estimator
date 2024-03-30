const mongoose = require("mongoose");
const Character = require("./characterModel");

// Define schema for the character

// Define schema for the player
const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: [true, "playerName is required"], unique: [true, "playerName must be unique"] },
  corporationId: { type: Number, required: [true, "corporationId is required"] },
  characterId: { type: Number, required: [true, "characterId is required"] },
  characters: [Character.schema],
});

// Create a model using the schemas
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
