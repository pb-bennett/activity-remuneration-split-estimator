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
    // miningOp.addPlayerMember("Kyira");
    // miningOp.playerMembers.filter((p) => p.playerName === "Kyira")[0].addCharacter("Kahraan");
    $(newFleetModal).modal("hide");
    $("#newFleetModalBtn").prop("disabled", true);
    $("#showDetails").prop("disabled", false);
    $("#mainContainer").html(miningOp.buildHtml());
    const miningOpJson = JSON.stringify(miningOp);
    console.log(miningOpJson);

    refreshInterval = setInterval(() => {
      if (miningOp.fleetName) $("#mainContainer").html(miningOp.buildHtml());
    }, 1000);
  });
  flatpickr("#datepicker", datePickerOptions);
  $("#showDetails")
    // .prop("disabled", true)
    .on("click", (event) => {
      // if (miningOp) miningOp.showDetails();
      // console.log(miningOp);
      console.log(miningOp.split());
    });

  // PAUSE BUTTON HANDLING
  // PAUSE HANDLING
  // OP PAUSE BUTTON HANDLING
  $("body").on("click", ".op-pause-btn *", (event) => {
    const btnEventObj = {
      type: "op-pause",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
    };
    miningOp.pause();
  });
  // PLAYER PAUSE BUTTON HANDLING
  $("body").on("click", ".player-pause-btn *", (event) => {
    const btnEventObj = {
      type: "player-pause",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
      playerId: $(event.target).closest(".player-container")[0].dataset.playerid,
    };
    miningOp.pausePlayer(btnEventObj);
    $("#mainContainer").html(miningOp.buildHtml());
  });
  // CHARACTER PAUSE BUTTON HANDLING
  $("body").on("click", ".character-pause-btn *", (event) => {
    const btnEventObj = {
      type: "character-pause",
      opId: $(event.target).closest(".op-container")[0].dataset.opid,
      playerId: $(event.target).closest(".player-container")[0].dataset.playerid,
      characterId: $(event.target).closest(".character-container")[0].dataset.characterid,
    };

    miningOp.pauseCharacter(btnEventObj);
    $("#mainContainer").html(miningOp.buildHtml());
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
    const newPlayer = prompt("Enter player name");
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
    const newCharacter = prompt("Enter character name");
    if (!newCharacter) return;
    const selectedPlayer = miningOp.getPlayer(btnEventObj.playerId);
    selectedPlayer.addCharacter(newCharacter);
    $("#mainContainer").html(miningOp.buildHtml());
  });
  miningOp = MiningOp.loadMiningOp(JSON.parse(opJSON));
  $("#mainContainer").html(miningOp.buildHtml());
  // refreshInterval = setInterval(() => {
  //   if (miningOp.fleetName) $("#mainContainer").html(miningOp.buildHtml());
  // }, 1000);
});

// Sample pairs of Date objects
// const datePairs = [
//   { start: new Date("2024-03-10T08:00:00"), end: new Date("2024-03-10T12:00:00") },
//   { start: new Date("2024-03-09T15:00:00"), end: new Date("2024-03-09T18:00:00") },
//   { start: new Date("2024-03-11T10:00:00"), end: new Date("2024-03-12T14:00:00") },
//   { start: new Date("2024-03-11T10:00:00"), end: new Date("2024-03-16T14:00:00") },
//   { start: new Date("2024-03-08T10:00:00"), end: new Date("2024-03-11T14:00:00") },
//   { start: new Date("2024-03-15T10:00:00"), end: new Date("2024-03-23T14:00:00") },

//   // Add more pairs as needed
// ];

// // Sort date pairs by start dates
// datePairs.sort((a, b) => a.start - b.start);

// // Function to check for overlaps or gaps between pairs
// function findOverlapsAndGaps(datePairs) {
//   let overlaps = [];
//   let gaps = [];

//   for (let i = 1; i < datePairs.length; i++) {
//     const currentPair = datePairs[i];
//     const previousPair = datePairs[i - 1];

//     if (currentPair.start < previousPair.end) {
//       // Overlap found
//       overlaps.push({
//         overlapStart: currentPair.start,
//         overlapEnd: new Date(Math.min(currentPair.end, previousPair.end)),
//       });
//     } else {
//       // Gap found
//       gaps.push({
//         gapStart: previousPair.end,
//         gapEnd: currentPair.start,
//       });
//     }
//   // }

//   return { overlaps, gaps };
// }

// Find overlaps and gaps
// const { overlaps, gaps } = findOverlapsAndGaps(datePairs);

// Output the results
// console.log("Overlaps:");
// overlaps.forEach((overlap) => console.log(`${overlap.overlapStart} - ${overlap.overlapEnd}`));

// console.log("\nGaps:");
// gaps.forEach((gap) => console.log(`${gap.gapStart} - ${gap.gapEnd}`));

const opJSON = `{"fleetLeader":"Bob Eagle","fleetName":"Eagle Fleet","startTime":"2024-03-16T13:44:00.000Z","playerMembers":[{"playerName":"Bob Eagle","characters":[{"characterName":"Bob Eagle","isActive":false,"hasBeenActive":false,"forcePause":false,"activityPeriods":[],"joinTime":"2024-03-16T13:44:31.588Z","periodStartTime":null,"id":"154f8a7a-4ae9-4d77-972f-ecc73708eb0d"}],"isActive":false,"id":"ad20d3c0-9b93-434a-ac4e-505ebf0f391b"},{"playerName":"Kyira","characters":[{"characterName":"Kyira","isActive":false,"hasBeenActive":false,"forcePause":false,"activityPeriods":[],"joinTime":"2024-03-16T13:44:31.588Z","periodStartTime":null,"id":"505d826a-dd79-4e2e-a54e-6d00924ce1fe"},{"characterName":"Kahraan","isActive":false,"hasBeenActive":false,"forcePause":false,"activityPeriods":[],"joinTime":"2024-03-16T13:44:31.588Z","periodStartTime":null,"id":"457a7fa5-3ffc-45af-a4af-79e5b383c4f9"}],"isActive":false,"id":"e551cb55-2e51-4cf5-a99f-fed33d871ae9"}],"htmlBuilder":{},"isActive":false,"id":"9bcaa53d-302b-4ce2-8381-1b510b29b2e1"}`;
