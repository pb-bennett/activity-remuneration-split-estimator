import Player from "./Player.js";
import Character from "./Character.js";
import HtmlBuilder from "./HtmlBuilder.js";
import SplitOp from "./SplitOp.js";

class MiningOp {
  constructor(fleetLeader, fleetName, startTime, reload = false) {
    this.fleetLeader = fleetLeader;
    this.fleetName = fleetName;
    this.startTime = new Date(startTime);
    this.playerMembers = [];
    if (!reload) this.addPlayerMember(fleetLeader);
    this.htmlBuilder = new HtmlBuilder();
    this.isActive = false;
    this.id = self.crypto.randomUUID();
    this.splitOp = new SplitOp();
  }
  showDetails() {
    console.log(this.fleetLeader, this.fleetName, this.startTime);
  }
  addPlayerMember(player) {
    this.playerMembers.push(new Player(player));
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
  pause() {
    if (this.isActive) {
      this.playerMembers.forEach((player) => player.pause());
      this.isActive = !this.isActive;
      return;
    }
    this.playerMembers.forEach((player) => player.unpause());
    this.isActive = !this.isActive;
  }
  pausePlayer(btnEventObj) {
    const playerToPause = this.getPlayer(btnEventObj.playerId);
    if (playerToPause.isActive) return playerToPause.pause();
    playerToPause.unpause();
  }

  //Toggles pause - should rename function
  pauseCharacter(btnEventObj) {
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
    playerToPause.isActive = true;
  }
  buildHtml() {
    return this.htmlBuilder.opHtml(this);
  }
  split() {
    return this.splitOp.split(this);
  }
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
