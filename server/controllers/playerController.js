const fs = require("fs").promises;

// Function to check if file exists

// Your endpoint function
exports.getAllPlayers = async (req, res) => {
  try {
    const filePath = process.env.PLAYERS_DATA_FILEPATH;

    // Check if the file exists
    await checkFileExists(filePath);

    // Read file and parse JSON
    const rawPlayers = await fs.readFile(filePath, "utf8");
    const players = JSON.parse(rawPlayers);

    // Check if players data is empty
    if (!players || players.length === 0) {
      const newError = new Error(`No players found in data source: ${filePath}`);
      newError.statusCode = 404; // Set custom status code
      throw newError;
    }
    // Set response headers and send response
    res.status(200).json({ result: "success", players });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors

    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};
exports.getPlayer = async (req, res) => {
  try {
    const filePath = process.env.PLAYERS_DATA_FILEPATH;

    // Check if the file exists
    await checkFileExists(filePath);

    // Read file and parse JSON
    const rawPlayers = await fs.readFile(filePath, "utf8");
    const players = JSON.parse(rawPlayers);
    const player = players.find((p) => p.playerId === req.params.id);

    // Check if players data is empty
    if (!player || player.length === 0) {
      const newError = new Error(`No player found with id ${req.params.id} in data source: ${filePath}`);
      newError.statusCode = 404; // Set custom status code
      throw newError;
    }
    // Set response headers and send response
    res.status(200).json({ result: "success", player });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors

    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};

async function checkFileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK); // Check file existence
    return true; // File exists
  } catch (error) {
    const newError = new Error(`Players data file not found: ${filePath}`);
    newError.statusCode = 404; // Set custom status code
    throw newError;
  }
}
