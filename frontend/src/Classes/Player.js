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
}

export default Player;
