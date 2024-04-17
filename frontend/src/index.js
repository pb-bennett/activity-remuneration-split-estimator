import flatpickr from "flatpickr";

import MiningOp from "./Classes/MiningOp.js";
import NewPlayer from "./Classes/NewPlayer.js";
import { datePickerOptions, characterUrlFinder } from "./options.js";

let miningOp;
// let refreshInterval;
$(document).ready(function () {
  $("#openModalBtn").click(function () {
    $("#exampleModal").modal("show");
  });

  $("#utilityBtn").click(function () {
    const opJson = JSON.stringify(miningOp);
    const opObj = JSON.parse(opJson);
    console.log(opObj);
  });

  flatpickr("#datepicker", datePickerOptions);
  $("#loadDemoOp").on("click", (event) => {
    const newPlayer = new NewPlayer(miningOp);
  });
  $("#utilityBtn2").on("click", (event) => {
    buildOp(event.target);
  });
});

const btnHandler = (target) => {
  const scope = $(target).closest(".ars-btn")[0].dataset.btnscope;
  const type = $(target).closest(".ars-btn")[0].dataset.btntype;
  const opId = $(target).closest(".op-container")[0].dataset.opid;
  const playerId = scope == "player" || scope == "character" ? $(target).closest(".player-container")[0].dataset.playerid : null;
  const characterId = scope == "character" ? $(target).closest(".character-container")[0].dataset.characterid : null;
  if (scope === "op" && type === "delete") {
    opDelete();
  } else {
    miningOp.clickHandler({ scope, type, opId, playerId, characterId });
  }

  $("#mainContainer").html(miningOp.buildHtml());
  $(".ars-btn").on("click", (event) => {
    btnHandler(event.target);
  });
  $('[data-toggle="tooltip"]').tooltip({
    delay: { show: 100, hide: 500 },
  });
};
const opDelete = () => {
  const confirmation = confirm(`Are you sure you want to delete ${miningOp.fleetName}?`);
  if (confirmation) {
    miningOp = {};
    // $("#newFleetModalBtn").prop("disabled", false);
    // $("#showDetails").prop("disabled", true);
    $("#mainContainer").html("");
  }
};

const fetchCharacterData = async () => {
  try {
    const rawCharacterData = await fetch("http://localhost:3500/api/v1/players/characters");
    const characterData = await rawCharacterData.json();
    console.log(characterData.characters);
    return characterData;
  } catch (error) {
    console.log(error);
  }
};

const buildOp = async (target) => {
  try {
    const rawCharacters = await fetch("http://localhost:3500/api/v1/characters");
    const characters = await rawCharacters.json();
    const rawPlayers = await fetch("http://localhost:3500/api/v1/players");
    const players = await rawPlayers.json();
    // console.log(players.data);
    const newOp = { fc: players.data[0], fleetName: "Eagle Fleet", startTime: new Date(), players: [players.data[4], players.data[1]] };
    // console.log(newOp);
    miningOp = new MiningOp(newOp);
    // console.log("MININGOP::::", miningOp);
    // console.log(characters);
    // console.log(players);
    $("#mainContainer").html(miningOp.buildHtml());

    $(".ars-btn").on("click", (event) => {
      btnHandler(event.target);
    });
  } catch (error) {
    console.error(error);
  }
};
