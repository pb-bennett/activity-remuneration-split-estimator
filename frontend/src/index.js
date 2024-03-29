import flatpickr from "flatpickr";

import MiningOp from "./Classes/MiningOp.js";
import { datePickerOptions } from "./options.js";
import { opJSON } from "./data.js";

let miningOp;
let refreshInterval;

$(document).ready(function () {
  $("#newFleetForm").on("submit", (event) => {
    event.preventDefault();

    if (!miningOp?.fleetName) miningOp = new MiningOp($("#fleetLeaderInput").val(), $("#fleetNameInput").val(), $("#datepicker").val());
    clearInterval(refreshInterval);
    // miningOp.addPlayerMember("Kyira");
    // miningOp.playerMembers.filter((p) => p.playerName === "Kyira")[0].addCharacter("Kahraan");
    $(newFleetModal).modal("hide");
    $("#newFleetModalBtn").prop("disabled", true);
    $("#showDetails").prop("disabled", false);
    $("#mainContainer").html(miningOp.buildHtml());
    const miningOpJson = JSON.stringify(miningOp);

    // refreshInterval = setInterval(() => {
    //   if (miningOp.fleetName) $("#mainContainer").html(miningOp.buildHtml());
    // }, 1000);
  });
  flatpickr("#datepicker", datePickerOptions);
  $("#showDetails").on("click", (event) => {});

  miningOp = MiningOp.loadMiningOp(JSON.parse(opJSON));
  $("#mainContainer").html(miningOp.buildHtml());

  $(".ars-btn").on("click", (event) => {
    btnHandler(event.target);
  });
  // refreshInterval = setInterval(() => {
  //   if (miningOp.fleetName) {
  //     $("#mainContainer").html(miningOp.buildHtml());
  //     $(".ars-btn").on("click", (event) => {
  //       btnHandler(event.target);
  //     });
  //   }
  // }, 1000);

  // fetchCharacterData();
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
};
const opDelete = () => {
  const confirmation = confirm(`Are you sure you want to delete ${miningOp.fleetName}?`);
  if (confirmation) {
    miningOp = {};
    $("#newFleetModalBtn").prop("disabled", false);
    $("#showDetails").prop("disabled", true);
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
