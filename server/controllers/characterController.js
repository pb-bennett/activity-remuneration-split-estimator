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

exports.updateCharacterFromSource = async (req, res) => {
  try {
    if (!req.body.confirm) {
      const newError = new Error("No confirmation received.");
      newError.statusCode = 400; // Set custom status code
      throw newError;
    }

    const url = process.env.EVE_WHO_CORP_API_URL;
    console.log(req.body.corpIds);
    const corpIds = req.body.corpIds;

    const currentCharactersList = await Character.find();
    const updatedCharacterList = [];

    for (const corpId of corpIds) {
      console.log(`${url}${corpId}`);
      const rawMembers = await fetch(`${url}${corpId}`);
      const membersObj = await rawMembers.json();

      // Construct an array of characters with updated information
      const members = membersObj.characters.map((member) => {
        return {
          characterId: member.character_id,
          characterName: member.name,
          corporationId: corpId,
        };
      });
      updatedCharacterList.push(...members);
    }
    const charactersToAdd = updatedCharacterList.filter((c) => !currentCharactersList.some((m) => m.characterId === c.characterId));
    const charactersToDelete = currentCharactersList.filter((c) => !updatedCharacterList.some((m) => m.characterId === c.characterId));
    const charactersToKeep = updatedCharacterList.filter((c) => !charactersToAdd.includes(c));

    // Delete characters that no longer exist

    await Character.deleteMany({ _id: { $in: charactersToDelete.map((c) => c._id) } });

    // Insert new characters
    await Character.insertMany(charactersToAdd);

    res.status(200).send({ status: "success", data: { addedCharacters: charactersToAdd.length, removedCharacters: charactersToDelete.length, retainedCharacters: charactersToKeep.length } });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).send({ status: "fail", error: errorMessage });
  }
};
