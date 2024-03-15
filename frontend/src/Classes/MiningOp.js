import Player from "./Player.js";
import HtmlBuilder from "./HtmlBuilder.js";

class MiningOp {
  constructor(fleetLeader, fleetName, startTime) {
    this.fleetLeader = fleetLeader;
    this.fleetName = fleetName;
    this.startTime = new Date(startTime);
    this.playerMembers = [];
    this.addPlayerMember(fleetLeader);
    this.htmlBuilder = new HtmlBuilder();
    this.isActive = false;
    this.id = self.crypto.randomUUID();
  }
  buildHtml() {
    return this.htmlBuilder.opHtml(this);
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
  pausePlayer(btnEventObj) {}
  pauseCharacter(btnEventObj) {
    const characterToPause = this.getCharacter(btnEventObj);
    if (characterToPause.isActive) return characterToPause.pause();
    characterToPause.unpause();
  }
}

export default MiningOp;
