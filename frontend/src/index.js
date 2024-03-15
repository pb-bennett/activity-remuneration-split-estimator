import flatpickr from "flatpickr";

import MiningOp from "./Classes/MiningOp.js";
import { datePickerOptions } from "./options.js";

let miningOp;
let refreshInterval;

$(document).ready(function () {
  $("#newFleetForm").on("submit", (event) => {
    event.preventDefault();

    if (!miningOp?.fleetName) miningOp = new MiningOp($("#fleetLeaderInput").val(), $("#fleetNameInput").val(), $("#datepicker").val());
    clearInterval(refreshInterval);
    miningOp.addPlayerMember("Kyira");
    miningOp.playerMembers.filter((p) => p.playerName === "Kyira")[0].addCharacter("Kahraan");
    $(newFleetModal).modal("hide");
    $("#newFleetModalBtn").prop("disabled", true);
    $("#showDetails").prop("disabled", false);
    $("#mainContainer").html(miningOp.buildHtml());
    const miningOpJson = JSON.stringify(miningOp);

    refreshInterval = setInterval(() => {
      if (miningOp.fleetName) $("#mainContainer").html(miningOp.buildHtml());
    }, 1000);
  });
  flatpickr("#datepicker", datePickerOptions);
  $("#showDetails")
    .prop("disabled", true)
    .on("click", (event) => {
      if (miningOp) miningOp.showDetails();
      console.log(miningOp);
    });

  // PAUSE BUTTON HANDLING
  // PAUSE HANDLING
  // OP PAUSE BUTTON HANDLING
  $("body").on("click", ".op-pause-btn *", (event) => {
    const btnEventObj = {
      type: "op-pause",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
    };
  });
  // PLAYER PAUSE BUTTON HANDLING
  $("body").on("click", ".player-pause-btn *", (event) => {
    const btnEventObj = {
      type: "player-pause",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
      playerId: $(event.target).closest(".player-container")[0].dataset.playerid,
    };
  });
  // CHARACTER PAUSE BUTTON HANDLING
  $("body").on("click", ".character-pause-btn *", (event) => {
    const btnEventObj = {
      type: "character-pause",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
      playerId: $(event.target).closest(".player-container")[0].dataset.playerid,
      characterId: $(event.target).closest(".character-container")[0].dataset.characterid,
    };
  });
  // DELETE HANDLING
  // OP DELETE BUTTON HANDLING
  $("body").on("click", ".op-delete-btn *", (event) => {
    const btnEventObj = {
      type: "op-delete",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
    };
    const confirmation = confirm(`Are you sure you want to delete ${miningOp.fleetName}?`);
    if (confirmation) {
      miningOp = {};
      $("#newFleetModalBtn").prop("disabled", false);
      $("#showDetails").prop("disabled", true);
    }
    $("#mainContainer").html("");
  });
  // PLAYER DELETE BUTTON HANDLING
  $("body").on("click", ".player-delete-btn *", (event) => {
    const btnEventObj = {
      type: "player-delete",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
      playerId: $(event.target).closest(".player-container")[0].dataset.playerid,
    };
    const playerToDelete = miningOp.getPlayer(btnEventObj.playerId);
    console.log(playerToDelete);
    const confirmation = confirm(`Are you sure you want to delete Player ${playerToDelete.playerName}?`);
    if (confirmation) {
      miningOp.deletePlayer(btnEventObj.playerId);
      $("#mainContainer").html(miningOp.buildHtml());
    }
  });
  // CHARACTER DELETE BUTTON HANDLING
  $("body").on("click", ".character-delete-btn *", (event) => {
    const btnEventObj = {
      type: "character-delete",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
      playerId: $(event.target).closest(".player-container")[0].dataset.playerid,
      characterId: $(event.target).closest(".character-container")[0].dataset.characterid,
    };

    const characterToDelete = miningOp.getCharacter(btnEventObj);
    console.log(characterToDelete);
    const confirmation = confirm(`Are you sure you want to delete Character ${characterToDelete.characterName}?`);
    if (confirmation) {
      miningOp.deleteCharacter(btnEventObj);
      $("#mainContainer").html(miningOp.buildHtml());
    }
  });
  // ADD HANDLING
  // OP  ADD HANDLING
  $("body").on("click", ".op-add-btn *", (event) => {
    const btnEventObj = {
      type: "player-add",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
    };
    const newPlayer = prompt("Enter player name", "Newbie Jake");
    if (!newPlayer) return;
    miningOp.addPlayerMember(newPlayer);
    $("#mainContainer").html(miningOp.buildHtml());
  });
  // PLAYER  ADD HANDLING
  $("body").on("click", ".player-add-btn *", (event) => {
    const btnEventObj = {
      type: "character-add",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
      playerId: $(event.target).closest(".player-container")[0].dataset.playerid,
    };
    const newCharacter = prompt("Enter character name", "Jake's alt");
    if (!newCharacter) return;
    const selectedPlayer = miningOp.getPlayer(btnEventObj.playerId);
    selectedPlayer.addCharacter(newCharacter);
    $("#mainContainer").html(miningOp.buildHtml());
  });
});
