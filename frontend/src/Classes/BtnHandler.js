class BtnHandler {
  static clickHandler(btnEventObj, miningOp) {
    console.log(btnEventObj);
    if (btnEventObj.scope === "op") this.opBtnHandler(btnEventObj, miningOp);
    if (btnEventObj.scope === "player") this.playerBtnHandler(btnEventObj, miningOp);
    if (btnEventObj.scope === "character") this.characterBtnHandler(btnEventObj, miningOp);
    // $("#mainContainer").html(this.buildHtml());
    // $(".ars-btn").on("click", (event) => {
    //   this.btnHandler(event.target);
    // });
  }
  static opBtnHandler(btnEventObj, miningOp) {
    if (btnEventObj.type === "pause") return miningOp.pause();
    if (btnEventObj.type === "split") return miningOp.split();
    if (btnEventObj.type === "add") return miningOp.addPlayerMember();
    if (btnEventObj.type === "edit") return miningOp.edit(btnEventObj);
  }
  static playerBtnHandler(btnEventObj, miningOp) {
    if (btnEventObj.type === "delete") return miningOp.deletePlayer(btnEventObj.playerId);
    if (btnEventObj.type === "pause") return miningOp.pausePlayer(btnEventObj);
    if (btnEventObj.type === "add") return miningOp.getPlayer(btnEventObj.playerId).addCharacter();
    if (btnEventObj.type === "edit") return miningOp.editPlayer(btnEventObj);
  }
  static characterBtnHandler(btnEventObj, miningOp) {
    if (btnEventObj.type === "delete") return miningOp.deleteCharacter(btnEventObj);
    if (btnEventObj.type === "pause") return miningOp.pauseCharacter(btnEventObj);
    if (btnEventObj.type === "edit") return miningOp.editCharacter(btnEventObj);
  }
}

export default BtnHandler;
