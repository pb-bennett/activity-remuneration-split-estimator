import Character from "./Character.js";

class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.characters = [];
    this.addCharacter(playerName);
  }
  addCharacter(character) {
    this.characters.push(new Character(character));
  }
}

export default Player;
