import MiningOp from "./Classes/MiningOp.js";
import { datePickerOptions } from "./options.js";

let miningOp;

$(document).ready(function () {
  $("#newFleetForm").on("submit", (event) => {
    event.preventDefault();
    if (!miningOp) miningOp = new MiningOp($("#fleetLeaderInput").val(), $("#fleetNameInput").val(), $("#datepicker").val());
    $(newFleetModal).modal("hide");
    $("#newFleetModalBtn").prop("disabled", true);
    $("#showDetails").prop("disabled", false);
  });
  flatpickr("#datepicker", datePickerOptions);
  $("#showDetails")
    .prop("disabled", true)
    .on("click", (event) => {
      if (miningOp) miningOp.showDetails();
      console.log(miningOp);
    });
});
