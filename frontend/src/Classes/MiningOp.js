import Player from "./Player.js";
import Character from "./Character.js";
import HtmlBuilder from "./HtmlBuilder.js";
import SplitOp from "./SplitOp.js";
import BtnHandler from "./BtnHandler.js";

class MiningOp {
  constructor(opData, reload = false) {
    this.fleetLeader = opData.fc.playerName;
    this.fleetName = opData.fleetName;
    this.startTime = new Date(startTime);
    this.playerMembers = [];
    if (!reload) this.addPlayerMember(fleetLeader);
    this.htmlBuilder = new HtmlBuilder();
    this.isActive = false;
    this.hasBeenActive = false;
    // this.id = self.crypto.randomUUID();
    this.splitOp = new SplitOp();
    this.timerRefreshInterval = setInterval(() => {
      this.timerRender();
    }, 1000);
    $(".ars-btn").on("click", (event) => {
      btnHandler(event.target);
    });
  }
  // constructor(fleetLeader, fleetName, startTime, reload = false) {
  //   this.fleetLeader = fleetLeader;
  //   this.fleetName = fleetName;
  //   this.startTime = new Date(startTime);
  //   this.playerMembers = [];
  //   if (!reload) this.addPlayerMember(fleetLeader);
  //   this.htmlBuilder = new HtmlBuilder();
  //   this.isActive = false;
  //   this.hasBeenActive = false;
  //   // this.id = self.crypto.randomUUID();
  //   this.splitOp = new SplitOp();
  //   this.timerRefreshInterval = setInterval(() => {
  //     this.timerRender();
  //   }, 1000);
  //   $(".ars-btn").on("click", (event) => {
  //     btnHandler(event.target);
  //   });
  // }
  timerRender() {
    $(".timer").each((index, element) => {
      const workTimeIds = this.getIds(element);
      let workTime = null;
      if (workTimeIds.type === "characterWorkTime") {
        workTime = this.htmlBuilder.formatTime(
          this.playerMembers
            .filter((player) => player.id === workTimeIds.playerId)[0]
            .characters.filter((char) => char.id === workTimeIds.characterId)[0]
            .workTime()
        );
      }
      if (workTimeIds.type === "playerWorkTime") {
        workTime = this.htmlBuilder.formatTime(
          this.playerMembers
            .filter((player) => player.id === workTimeIds.playerId)[0]
            .characters.map((char) => char.workTime())
            .reduce((acc, cur) => acc + cur, 0)
        );
      }
      if (workTimeIds.type === "opWorkTime") {
        workTime = this.htmlBuilder.formatTime(this.playerMembers.map((player) => player.characters.map((char) => char.workTime()).reduce((acc, cur) => acc + cur, 0)).reduce((acc, cur) => acc + cur, 0));
      }
      $(element).text(workTime);
    });
  }
  getIds(element) {
    const type = element.dataset.timertype;
    const opId = $(element).closest(".op-container")[0].dataset.opid;
    const playerId = type === "playerWorkTime" || type === "characterWorkTime" ? $(element).closest(".player-container")[0].dataset.playerid : null;
    const characterId = type === "characterWorkTime" ? $(element).closest(".character-container")[0].dataset.characterid : null;
    return {
      type,
      opId,
      playerId,
      characterId,
    };
  }
  clickHandler(btnEventObj) {
    BtnHandler.clickHandler(btnEventObj, this);
  }

  showDetails() {
    console.log(this.fleetLeader, this.fleetName, this.startTime);
  }
  addPlayerMember() {
    const newPlayer = prompt("Enter player name");
    if (newPlayer) this.playerMembers.push(new Player(newPlayer));
  }
  getPlayer(playerId) {
    return this.playerMembers.filter((player) => player.id === playerId)[0];
  }
  deletePlayer(playerId) {
    this.playerMembers = this.playerMembers.filter((player) => player.id !== playerId);
  }
  getCharacter(btnEventObj) {
    return this.getPlayer(btnEventObj.playerId).getCharacter(btnEventObj.characterId);
  }
  deleteCharacter(btnEventObj) {
    this.getPlayer(btnEventObj.playerId).deleteCharacter(btnEventObj.characterId);
    if (this.getPlayer(btnEventObj.playerId).characters.length === 0) {
      this.deletePlayer(btnEventObj.playerId);
    }
  }
  pause(btnEventObj) {
    console.log("pausing op:", btnEventObj);
    if (this.isActive) {
      this.playerMembers.forEach((player) => player.pause());
      this.isActive = !this.isActive;
      return;
    }
    this.playerMembers.forEach((player) => player.unpause());
    this.isActive = !this.isActive;
    this.hasBeenActive = true;
  }
  pausePlayer(btnEventObj) {
    if (!this.hasBeenActive) return;
    const playerToPause = this.getPlayer(btnEventObj.playerId);

    if (playerToPause.isActive) return playerToPause.pause();
    this.isActive = true;
    playerToPause.unpause();
  }

  //Toggles pause - should rename function
  pauseCharacter(btnEventObj) {
    if (!this.hasBeenActive) return;
    const characterToPause = this.getCharacter(btnEventObj);
    const playerToPause = this.getPlayer(btnEventObj.playerId);
    // pausing character if is active
    if (characterToPause.isActive) {
      characterToPause.pause();
      //check if player has other characters that are active, if false pause character also
      !playerToPause.characters.filter((character) => character.isActive).length > 0 ? (playerToPause.isActive = false) : (playerToPause.isActive = true);
      return;
    }
    characterToPause.unpause();
    this.isActive = true;
    playerToPause.isActive = true;
  }
  edit(btnEventObj) {
    console.log("editing Op:", btnEventObj);
  }
  editPlayer(btnEventObj) {
    console.log("editing player:", btnEventObj);
  }
  editCharacter(btnEventObj) {
    console.log("editing character:", btnEventObj);
  }
  buildHtml() {
    return this.htmlBuilder.opHtml(this);
  }
  // btnHandler = (target) => {
  //   const scope = $(target).closest(".ars-btn")[0].dataset.btnscope;
  //   const type = $(target).closest(".ars-btn")[0].dataset.btntype;
  //   const opId = $(target).closest(".op-container")[0].dataset.opid;
  //   const playerId = scope == "player" || scope == "character" ? $(target).closest(".player-container")[0].dataset.playerid : null;
  //   const characterId = scope == "character" ? $(target).closest(".character-container")[0].dataset.characterid : null;
  //   if (scope === "op" && type === "delete") return opDelete();
  //   this.clickHandler({ scope, type, opId, playerId, characterId });
  // };

  split() {
    return this.splitOp.split(this);
  }

  // static buildNewOp(opData) {{

  // }}

  static loadMiningOp(parsedMiningOp) {
    const miningOp = new MiningOp(parsedMiningOp.fleetLeader, parsedMiningOp.fleetName, parsedMiningOp.startTime, true);
    miningOp.playerMembers = parsedMiningOp.playerMembers.map((playerData) => {
      const player = new Player(playerData.playerName, true);
      player.characters = playerData.characters.map((characterData) => {
        const character = new Character(characterData.characterName);
        character.isActive = characterData.isActive;
        character.hasBeenActive = characterData.hasBeenActive;
        character.forcePause = characterData.forcePause;
        character.activityPeriods = characterData.activityPeriods;
        character.joinTime = new Date(characterData.joinTime);
        character.periodStartTime = new Date(characterData.periodStartTime) || null;
        character.id = characterData.id;
        return character;
      });
      player.isActive = playerData.isActive;
      player.id = playerData.id;
      return player;
    });
    miningOp.isActive = parsedMiningOp.isActive;
    miningOp.id = parsedMiningOp.id;
    return miningOp;
  }
}

export default MiningOp;
