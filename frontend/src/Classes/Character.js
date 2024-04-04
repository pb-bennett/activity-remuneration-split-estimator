// import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Character {
  constructor(character) {
    this.characterName = character.characterName;
    this.isActive = false;
    this.hasBeenActive = false;
    this.forcePause = false;
    this.activityPeriods = [];
    this.joinTime = new Date();
    this.periodStartTime = null;
    this.id = character._id;
  }
  pause() {
    this.isActive = false;
    this.activityPeriods = [...this.activityPeriods, { periodStart: this.periodStartTime, periodEnd: new Date() }];
    this.periodStartTime = null;
  }
  unpause() {
    this.isActive = true;
    this.hasBeenActive = true;
    this.forcePause = false;
    this.periodStartTime = new Date();
  }
  workTime() {
    const timeNow = new Date();
    //If the character has not been activated ever in the current op return 0
    if (!this.hasBeenActive) return 0;
    //If the character has not been paused before but is active return the current time period only
    if (this.activityPeriods.length === 0) return timeNow - this.periodStartTime;
    let totalWorkTime = 0;
    //Sums all activity periods for the character
    this.activityPeriods.forEach((activityPeriod) => {
      totalWorkTime += activityPeriod.periodEnd - activityPeriod.periodStart;
    });
    //Adding the current time period if character is unpaused
    if (this.periodStartTime) totalWorkTime += timeNow - this.periodStartTime;
    return totalWorkTime;
  }
}

export default Character;
