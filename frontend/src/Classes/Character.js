import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Character {
  constructor(characterName) {
    this.characterName = characterName;
    this.isActive = false;
    this.hasBeenActive = false;
    this.forcePause = false;
    this.activityPeriods = [];
    this.joinTime = new Date();
    this.periodStartTime = null;
    this.id = uuidv4();
  }
  pause() {
    this.isActive = false;
    this.activityPeriods = [...this.activityPeriods, [this.periodStartTime, new Date()]];
    this.periodStartTime = null;
  }
  unpause() {
    console.log("unpausing", this.characterName);
    this.isActive = true;
    this.hasBeenActive = true;
    this.periodStartTime = new Date();
  }
  workTime() {
    const timeNow = new Date();
    if (!this.hasBeenActive) return 0;
    if (this.activityPeriods.length === 0) return timeNow - this.periodStartTime;
    let totalWorkTime = 0;
    this.activityPeriods.forEach((activityPeriod) => {
      totalWorkTime += activityPeriod[1] - activityPeriod[0];
    });
    if (this.periodStartTime) totalWorkTime += timeNow - this.periodStartTime;
    return totalWorkTime;
  }
}

export default Character;
