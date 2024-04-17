const mongoose = require("mongoose");

const seatUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_login: {
    type: Date,
    required: true,
  },
  last_login_source: {
    type: String,
    required: true,
  },
  associated_character_ids: [
    {
      type: Number,
    },
  ],
  main_character_id: {
    type: Number,
    required: true,
  },
});

const SeatUser = mongoose.model("User", seatUserSchema);

module.exports = SeatUser;
