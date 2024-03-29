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
    const newCharacter = prompt("Enter character name", character);
    this.characters.push(new Character(newCharacter));
  }
  getCharacter(characterId) {
    return this.characters.filter((character) => character.id === characterId)[0];
  }
  deleteCharacter(characterId) {
    this.characters = this.characters.filter((character) => character.id !== characterId);
  }
  pause() {
    this.isActive = false;
    this.characters.forEach((character) => {
      if (character.isActive) {
        character.pause();
        character.forcePause = true;
      }
    });
  }
  unpause() {
    this.isActive = true;
    this.characters.forEach((character) => {
      if (character.forcePause || !character.hasBeenActive) {
        character.unpause();
      }
    });
  }
}

export default Player;
