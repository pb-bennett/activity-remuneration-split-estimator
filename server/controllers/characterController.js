const Character = require("../models/characterModel");

exports.getCharacters = async (req, res) => {
  try {
    const cosmosCharacters = await Character.find(req.body);
    if (!cosmosCharacters || cosmosCharacters.length === 0) {
      const newError = new Error("No characters found.");
      newError.statusCode = 404; // Set custom status code
      throw newError;
    }
    res.status(200).send({ result: "success", length: cosmosCharacters.length, data: cosmosCharacters });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).send({ result: "fail", error: errorMessage });
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
    const characters = [];
    for (const corpId of corpIds) {
      console.log(`${url}${corpId}`);
      const rawMembers = await fetch(`${url}${corpId}`);
      const membersObj = await rawMembers.json();
      // console.log(membersObj);
      const members = membersObj.characters.map((member) => {
        return {
          characterId: member.character_id,
          characterName: member.name,
          corporationId: corpId,
        };
      });
      characters.push(...members);
    }
    await Character.deleteMany({});
    const dataResult = await Character.insertMany(characters);
    res.status(200).send({ result: "success", length: dataResult.length, data: dataResult });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};
