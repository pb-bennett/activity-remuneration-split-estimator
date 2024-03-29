const fs = require("fs");

exports.getCharacters = (req, res) => {
  const cosmosCharacters = JSON.parse(fs.readFileSync("./data/cosmosCharacters.json", "utf8"));

  // console.dir(cosmosCharacters, { depth: null });
  res.status(200).send(cosmosCharacters);
};
