const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const app = express();
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

const path = require("path");
const playerRoutes = require("./routes/playerRoutes");
const characterRoutes = require("./routes/characterRoutes");
const operationRoutes = require("./routes/operationRoutes");
const databaseUpdateRouter = require("./routes/databaseUpdateRoutes");

app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const cors = require("cors");
// const router = require("./router");

const limiter = rateLimit({
  max: 100,
  windowMs: 2 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an 2 minutes!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "30kb" }));
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/characters", characterRoutes);
app.use("/api/v1/operations", operationRoutes);
app.use("/api/v1/db-update", databaseUpdateRouter);

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

module.exports = app;
