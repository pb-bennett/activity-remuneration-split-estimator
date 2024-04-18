require("dotenv").config();
const mongoose = require("mongoose");

const Player = require("../models/playerModel");
const SeatUser = require("../models/seatUserModel");
const Character = require("../models/characterModel");

console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("🛰️🛰️DB connection successful!🛰️🛰️"))
  .then(() => {
    cleanSeatData();
  });

const cleanSeatData = async () => {
  try {
    const unfilterSeatData = await SeatUser.find();
    console.log(unfilterSeatData);
  } catch (error) {
    console.error(error);
  }
};
