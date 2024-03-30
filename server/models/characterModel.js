const mongoose = require("mongoose");

// Define schema for the character
const characterSchema = new mongoose.Schema({
  characterId: { type: Number, required: [true, "characterId is required"], unique: [true, "characterId must be unique"] },
  corporationId: { type: Number, required: [true, "corporationId is required"] },
  characterName: { type: String, required: [true, "characterName is required"], unique: [true, "characterName must be unique"] },
});

// Create a model using the schema
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
