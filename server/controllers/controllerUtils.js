const fs = require("fs").promises;

// Function to check if file exists
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

module.exports = { checkFileExists };
