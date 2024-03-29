const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3500;
const path = require("path");
const playerRoutes = require("./routes/playerRoutes");
const characterRoutes = require("./routes/characterRoutes");
const operationRoutes = require("./routes/operationRoutes");

app.use(express.static(path.join(__dirname, "public")));

// const cors = require("cors");
// const router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/characters", characterRoutes);
app.use("/api/v1/operations", operationRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
