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
    console.log(this.id);
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
}

export default MiningOp;
