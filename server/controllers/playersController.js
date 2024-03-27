const fs = require("fs");

exports.getCharacters = (req, res) => {
  const players = JSON.parse(fs.readFileSync("./data/playersData.json", "utf8"));
  const cosmosCharacters = JSON.parse(fs.readFileSync("./data/cosmosCharacters.json", "utf8"));

  console.dir(cosmosCharacters, { depth: null });
  res.status(200).send(cosmosCharacters);
};
