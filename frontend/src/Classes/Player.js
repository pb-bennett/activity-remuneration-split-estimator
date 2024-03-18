// import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import Character from "./Character.js";

class Player {
  constructor(playerName, reload = false) {
    this.playerName = playerName;
    this.characters = [];
    if (!reload) this.addCharacter(playerName);
    this.isActive = false;
    this.id = self.crypto.randomUUID();
  }
  addCharacter(character) {
    this.characters.push(new Character(character));
  }
  getCharacter(characterId) {
    return this.characters.filter((character) => character.id === characterId)[0];
  }
  deleteCharacter(characterId) {
    console.log("deleting", characterId);
    this.characters = this.characters.filter((character) => character.id !== characterId);
  }
  pause() {
    console.log("pausing player", this.playerName);
    this.isActive = false;
    this.characters.forEach((character) => {
      if (character.isActive) {
        character.pause();
        character.forcePause = true;
        console.log("pausing", character.characterName, character.activityPeriods, "Force Pause:", character.forcePause, "Is Active:", character.isActive);
      }
    });
  }
  unpause() {
    console.log("unpausing player", this.playerName);
    this.isActive = true;
    this.characters.forEach((character) => {
      if (character.forcePause || !character.hasBeenActive) {
        character.unpause();
      }
    });
  }
}

export default Player;
