class Character {
  constructor(characterName) {
    this.characterName = characterName;
    this.active = false;
    this.activityPeriods = [];
    this.joinTime = new Date();
    this.periodStartTime = null;
    // this.id =
  }
  pause() {
    this.active = false;
    this.activityPeriods = [...this.activityPeriods, [this.periodStartTime, new Date()]];
  }
  unpause() {
    this.active = true;
    this.periodStartTime = new Date();
  }
  workTime() {
    const timeNow = new Date();
    if (this.activityPeriods.length === 0) return timeNow - this.periodStartTime;
    let totalWorkTime = 0;
    this.activityPeriods.forEach((activityPeriod) => {
      totalWorkTime += activityPeriod[1] - activityPeriod[0];
    });
    return totalWorkTime;
  }
}

export default Character;
