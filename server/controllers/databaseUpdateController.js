const mongoose = require("mongoose");
const Player = require("../models/playerModel");
const SeatUser = require("../models/seatUserModel");
const Character = require("../models/characterModel");

const seatToken = process.env.SEAT_TOKEN;
const seatUrl = process.env.SEAT_URL;

exports.updateSeatDb = async (req, res) => {
  try {
    if (!req.body.confirm || req.body.confirm) {
      const newError = new Error("No confirmation received.");
      newError.statusCode = 400; // Set custom status code
      throw newError;
    }
    const seatHeader = {
      Accept: "application/json",
      "X-Token": seatToken,
    };
    const initialSeatFetchRaw = await fetch(seatUrl, { headers: seatHeader });
    const initialSeatFetch = await initialSeatFetchRaw.json();
    const totalSeatPages = initialSeatFetch.meta.last_page;
    let seatFetchData = [...initialSeatFetch.data];
    let currentSeatPage = 2;
    while (currentSeatPage <= totalSeatPages) {
      console.log(`Fetching: ${seatUrl}?page=${currentSeatPage}`);
      const seatFetchRaw = await fetch(`${seatUrl}?page=${currentSeatPage}`, { headers: seatHeader });
      const seatFetch = await seatFetchRaw.json();
      seatFetchData = [...seatFetchData, ...seatFetch.data];
      currentSeatPage++;
    }
    if (!seatFetchData || seatFetchData.length === 0) {
      const newError = new Error("No characters found.");
      newError.statusCode = 404;
      throw newError;
    }
    SeatUser.deleteMany({});
    const dbResult = await SeatUser.insertMany(seatFetchData);
    console.log(seatFetchData);

    res.status(200).json({ result: "success", data: dbResult });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors
    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};

exports.updateCharacterFromSource = async (req, res) => {
  try {
    if (!req.body.confirm) {
      const newError = new Error("No confirmation received.");
      newError.statusCode = 400; // Set custom status code
      throw newError;
    }
    console.log("test1");
    console.log("test1");
    const url = process.env.EVE_WHO_CORP_API_URL;
    console.log(req.body.corpIds);
    const corpIds = req.body.corpIds;

    const currentCharactersList = await Character.find();
    const updatedCharacterList = [];

    console.log("test2");
    for (const corpId of corpIds) {
      console.log(`${url}${corpId}`);
      const rawMembers = await fetch(`${url}${corpId}`);
      const membersObj = await rawMembers.json();

      // Construct an array of characters with updated information
      const members = membersObj.characters.map((member) => {
        return {
          characterId: member.character_id,
          characterName: member.name,
          corporationId: corpId,
        };
      });
      updatedCharacterList.push(...members);
    }
    const charactersToAdd = updatedCharacterList.filter((c) => !currentCharactersList.some((m) => m.characterId === c.characterId));
    const charactersToDelete = currentCharactersList.filter((c) => !updatedCharacterList.some((m) => m.characterId === c.characterId));
    const charactersToKeep = updatedCharacterList.filter((c) => !charactersToAdd.includes(c));

    // Update DB
    await Character.deleteMany({ _id: { $in: charactersToDelete.map((c) => c._id) } });
    await Character.insertMany(charactersToAdd);
    const updateOverview = { retainedCharacters: charactersToKeep.length, deletedCharacters: { length: charactersToDelete.length, deleted: charactersToDelete }, addedCharacters: { length: charactersToAdd.length, added: charactersToAdd } };
    res.status(200).send({ status: "success", data: updateOverview });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).send({ status: "fail", error: errorMessage });
  }
};

exports.updatePlayerDatabase = async (req, res) => {
  try {
    if (!req.body.confirm) {
      const newError = new Error("No confirmation received.");
      newError.statusCode = 400; // Set custom status code
      throw newError;
    }
    const seatUserList = await SeatUser.find();
    const cosmosCharacterList = await Character.find();
    const cosmosCharacterIdList = cosmosCharacterList.map((c) => c.characterId);
    let cosmosPlayers = [];

    seatUserList.forEach((user) => {
      if (cosmosCharacterIdList.includes(user.main_character_id)) {
        cosmosPlayers = [...cosmosPlayers, userToPlayer(user, cosmosCharacterIdList, cosmosCharacterList)];
      }
      if (!cosmosCharacterIdList.includes(user.main_character_id) && user.associated_character_ids.some((characterId) => cosmosCharacterIdList.includes(characterId))) {
        cosmosPlayers = [...cosmosPlayers, userToPlayer(user, cosmosCharacterIdList, cosmosCharacterList, false)];
      }
    });
    res.status(200).json({ result: "success", length: cosmosPlayers.length, data: cosmosPlayers });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    // Handle other errors
    res.status(statusCode).send({ result: "fail", error: errorMessage });
  }
};

const userToPlayer = (user, cosmosCharacterIdList, cosmosCharacterList, cosmosMain = true) => {
  let cosmosCharacters = [];
  if (user.associated_character_ids.length > 0) {
    user.associated_character_ids.forEach((id) => {
      if (cosmosCharacterIdList.includes(id)) {
        const { characterId, corporationId, characterName } = cosmosCharacterList.find((c) => c.characterId === id);
        cosmosCharacters = [...cosmosCharacters, { characterId, corporationId, characterName }];
      }
    });
  }
  const cosmosUser = { mainCharacterId: user.main_character_id, associatedCharacters: cosmosCharacters, name: user.name, cosmosMain };
  return cosmosUser;
};
