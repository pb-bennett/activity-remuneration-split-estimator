// import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import Character from "./Character.js";

class Player {
  constructor(player, reload = false) {
    this.playerName = player.playerName;
    this.characters = [];
    // if (!reload) this.addCharacter(player);
    if (!reload && player.characters.length > 0) player.characters.forEach((character) => this.characters.push(new Character(character)));
    this.isActive = false;
    this.id = player.characterId;
    this.characterId = player.characterId;
  }
  addCharacter(character) {
    // const newCharacter = prompt("Enter character name", character);
    this.characters.push(new Character(character));
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
