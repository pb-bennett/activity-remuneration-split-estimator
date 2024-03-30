const mongoose = require("mongoose");

// Define schema for the character
const characterSchema = new mongoose.Schema({
  characterId: Number,
  corporationId: Number,
  characterName: String,
});

// Create a model using the schema
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
