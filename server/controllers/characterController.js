const Character = require("../models/characterModel");

exports.getAllCharacters = async (req, res) => {
  try {
    const cosmosCharacters = await Character.find(req.body);
    if (!cosmosCharacters || cosmosCharacters.length === 0) {
      const newError = new Error("No characters found.");
      newError.statusCode = 404;
      throw newError;
    }
    res.status(200).send({ status: "success", length: cosmosCharacters.length, data: cosmosCharacters });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).send({ status: "fail", error: errorMessage });
  }
};

exports.getCharacter = async (req, res) => {
  const characterId = req.params.id;
  const cosmosCharacter = await Character.findOne({ characterId });

  if (!cosmosCharacter) {
    const newError = new Error("Character not found.");
    newError.statusCode = 404;
    throw newError;
  }
  res.status(200).send({ status: "success", data: cosmosCharacter });
};
