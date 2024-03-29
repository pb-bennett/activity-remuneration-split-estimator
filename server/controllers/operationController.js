const fs = require("fs");

exports.getCharacters = (req, res) => {
  const exampleOperation = JSON.parse(fs.readFileSync("./data/exampleOperation.json", "utf8"));

  // console.dir(exampleOperation, { depth: null });
  res.status(200).send(exampleOperation);
};
