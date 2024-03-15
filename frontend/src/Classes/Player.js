import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import Character from "./Character.js";

class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.characters = [];
    this.addCharacter(playerName);
    this.isActive = false;
    this.id = uuidv4();
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
}

export default Player;
