require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const { updateCharactersDB, resetPlayersDB } = require("./utils/updateDBs");

const port = process.env.PORT || 3500;

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("🛰️🛰️DB connection successful!🛰️🛰️"))
  .then(() => {
    app.listen(port, () => {
      console.log(`👂👂Listening on port ${port}👂👂`);
    });
  })
  .then(() => {
    // resetPlayersDB();
    updateCharactersDB();
  });

process.on("unhandledRejection", (err) => {
  console.log("💥 UNHANDLED REJECTION! 💥 Shutting down... 💥");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
