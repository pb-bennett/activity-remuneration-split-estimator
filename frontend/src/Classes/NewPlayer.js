class NewPlayer {
  constructor(existingOp) {
    // Call the async method fetchPlayerList within the constructor
    this.existingPlayers = this.isMiningOp(existingOp) ? existingOp.playerMembers : [];
    console.log(this.existingPlayers);
    this.fetchPlayerList();

    this.fetchCharacterList()
      .then((characterList) => {
        this.characterlist = characterList.data; // Assign the fetched player list to the property
      })
      .catch((error) => {
        console.error("Failed to fetch player list:", error);
      });

    $("#exampleModal").modal("show");
  }

  async fetchPlayerList() {
    try {
      const rawPlayerList = await fetch("http://localhost:3500/api/v1/players");
      const playerList = await rawPlayerList.json();
      // this.playerList = playerList.data;
      const currentPlayerIds = this.existingPlayers.map((player) => player.characterId);
      console.log(currentPlayerIds);
      this.playerList = playerList.data.filter((player) => !currentPlayerIds.includes(player.characterId));
      // console.log(trimmedPlayerList);

      this.populateModal();
    } catch (error) {
      console.error("Error fetching player list:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
  async fetchCharacterList() {
    try {
      const rawCharacterList = await fetch("http://localhost:3500/api/v1/characters");
      const characterList = await rawCharacterList.json();

      return characterList;
    } catch (error) {
      console.error("Error fetching character list:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
  populateModal() {
    // Clear the modal body
    $("#exampleModal .modal-body").empty();
    // Populate the modal with the player list contents
    this.playerList.forEach((player) => {
      // Append player data to the modal body, adjust this according to your modal structure
      $("#exampleModal .modal-body").append(`<div>${player.playerName}</div>`);
    });

    // Show the modal after populating it with data
    $("#exampleModal").modal("show");
  }
  isMiningOp(op) {
    if (typeof op !== "object" || op == null) {
      return false;
    }
    console.log("step1done");
    for (let key in op) {
      if (op.hasOwnProperty(key)) {
        return true;
      }
      return false;
    }
  }
}

export default NewPlayer;
