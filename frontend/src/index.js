import flatpickr from "flatpickr";

import MiningOp from "./Classes/MiningOp.js";
import { datePickerOptions } from "./options.js";

let miningOp;

$(document).ready(function () {
  $("#newFleetForm").on("submit", (event) => {
    event.preventDefault();
    if (!miningOp) miningOp = new MiningOp($("#fleetLeaderInput").val(), $("#fleetNameInput").val(), $("#datepicker").val());
    miningOp.addPlayerMember("Kyira");
    miningOp.playerMembers.filter((p) => p.playerName === "Kyira")[0].addCharacter("Kahraan");
    $(newFleetModal).modal("hide");
    $("#newFleetModalBtn").prop("disabled", true);
    $("#showDetails").prop("disabled", false);
    // console.log(miningOp.buildHtml());
    $("#mainContainer").html(miningOp.buildHtml());
    const miningOpJson = JSON.stringify(miningOp);
    console.log(miningOpJson);
    // setInterval(() => {
    //   $("#mainContainer").html(miningOp.buildHtml());
    // }, 1000);
  });
  flatpickr("#datepicker", datePickerOptions);
  $("#showDetails")
    .prop("disabled", true)
    .on("click", (event) => {
      if (miningOp) miningOp.showDetails();
      console.log(miningOp);
    });
});
