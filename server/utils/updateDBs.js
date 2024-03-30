const fs = require("fs").promises;
const path = require("path");

const Character = require("../models/characterModel");
const Player = require("../models/playerModel");

exports.updateCharactersDB = async () => {
  try {
    const url = process.env.EVE_WHO_CORP_API_URL;
    const corpsIds = [98664079, 98657953];

    for (const corpId of corpsIds) {
      console.log(`${url}${corpId}`);
      const rawMembers = await fetch(`${url}${corpId}`);
      const membersObj = await rawMembers.json();
      // console.log(membersObj);
      const members = membersObj.characters.map((member) => {
        return {
          characterId: member.character_id,
          characterName: member.name,
          corporationId: corpId,
        };
      });
      await Character.deleteMany({});
      await Character.insertMany(members);
      console.log(members);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.resetPlayersDB = async () => {
  try {
    console.log("Resetting players DB...");
    await Player.deleteMany({});
    const filePath = path.resolve(process.env.PLAYERS_DATA_FILEPATH);
    const rawPlayers = await fs.readFile(filePath, "utf8");
    const players = JSON.parse(rawPlayers);
    await Player.insertMany(players);
    console.log("Players DB reset successfully.");
  } catch (error) {
    console.error(error);
  }
};
