class HtmlBuilder {
  constructor() {}
  opHtml(op) {
    let opWorkTime = 0;
    // const workTimeArray = op.playerMembers.map((player) => {
    //   return player.characters.map((character) => character.workTime());
    // });
    // const upTime = this._findOverlapsAndGaps(workTimeArray);
    // console.log(upTime);

    const playersHtml = op.playerMembers
      .map((player) => {
        const playerHtmlObj = this._playerHtmlObj(player);
        opWorkTime = opWorkTime += playerHtmlObj.playerWorkTime;
        return playerHtmlObj.html;
      })
      .join("");
    return `
      <div class= "op-container d-flex flex-column gap-1 borders rounded p-1 overflow-auto" data-opId="${op.id}">
      <div  class="d-flex justify-content-between op-header py-1">
        <div class="d-flex flex-column gap-1">
          <div class="h5  p-2 m-0">Foreman: ${op.fleetLeader}</div>
          <div class="fs-6  px-2 py-0 m-0 d-flex justify-content-between">
            <div>Started: </div>
            <div>${op.startTime.toLocaleTimeString("en-GB", { timeZone: "Atlantic/Reykjavik", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </div>
        <div class="h5  p-2 m-0 d-flex flex-column justify-content-center">
          <div class="px-4">${op.fleetName}</div>
        </div>
        <div class="d-flex gap-4 align-items-center">
          <a href="#" class="op-add-btn">
            <img src="./img/plus.svg" width="36" alt="pause icon">
          </a>
          <a href="#" class="op-pause-btn">
            <img src="./img/${op.isActive ? "pause" : "play"}.svg" width="36" alt="pause icon">
          </a>
          <div class="d-flex flex-column gap-1">
           
            <div>Operation Work-Time: ${this._formatTime(opWorkTime)}</div>
          </div>
          <a href="#" class="op-delete-btn">
            <img src="./img/trash.svg" width="36" alt="pause icon">
          </a>
        </div>
        </div>
        <div class="players-container d-flex flex-column gap-1 p-1 ">
        ${playersHtml}
        </div>
        </div>
  
    `;
  }
  _playerHtmlObj(player) {
    const playerWorkTime = player.characters.map((char) => char.workTime()).reduce((acc, cur) => acc + cur, 0);
    const characterHtml = player.characters
      .map((character) => {
        return this._characterHtml(character);
      })
      .join(" ");
    return {
      html: `
  <div class="container-fluid borders d-flex flex-column rounded py-1 player-container" data-playerId="${player.id}">
    <div class="row d-flex flex-column gap-1 pb-1">
      <div class="d-flex justify-content-between">
        <div class="d-flex gap-3">
          <div class="fs-6">Player: ${player.playerName}</div>
          <div class="fs-6">Characters in fleet: ${player.characters.length}</div>
        </div>
        <div class="d-flex gap-2">
      <a href="#" class="player-add-btn p-1">
        <img src="./img/plus.svg" width="18" alt="plus icon" >
      </a>
      <a href="#" class="player-pause-btn p-1">
        <img src="./img/${player.isActive ? "pause" : "play"}.svg" width="18" alt="pause icon"  />
      </a>
      <div>Player Work-Time: ${this._formatTime(playerWorkTime)}</div>
      <a href="#" class="player-delete-btn p-1">
        <img src="./img/trash.svg" width="18" alt="pause icon" />
      </a>
        </div>
      </div>
      <div class="d-flex flex-column gap-1">
      </div>
      </div>
      <div>
      </div>
      <div class="characters-container d-flex flex-column gap-1">
      ${characterHtml}
      </div>
  </div>
    `,
      playerWorkTime,
    };
  }
  _characterHtml(character) {
    return `
  <div class="d-flex justify-content-between borders rounded p-1 character-container" data-characterId="${character.id}">
    <div>Character: ${character.characterName}</div>
    <div class="d-flex gap-2" >
      <a class="character-pause-btn p-1" href="#"">
        <img src="./img/${character.isActive ? "pause" : "play"}.svg" width="18" alt="pause icon" />
      </a>
      <div>Work-Time: ${this._formatTime(character.workTime())}</div>
      <a href="#" class="character-delete-btn p-1">
        <img src="./img/trash.svg" width="18" alt="pause icon" />
      </a>
    </div>
  </div>
    `;
  }
  _formatTime(ms) {
    const pad = (num) => (num < 10 ? "0" : "") + num;

    // Convert ms to seconds
    const totalSeconds = Math.floor(ms / 1000);

    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format the result
    const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

    return formattedTime;
  }
  // _findOverlapsAndGaps(datePairs) {
  //   let overlaps = [];
  //   let gaps = [];

  //   for (let i = 1; i < datePairs.length; i++) {
  //     const currentPair = datePairs[i];
  //     const previousPair = datePairs[i - 1];

  //     if (currentPair.start < previousPair.end) {
  //       // Overlap found
  //       overlaps.push({
  //         overlapStart: currentPair.start,
  //         overlapEnd: new Date(Math.min(currentPair.end, previousPair.end)),
  //       });
  //     } else {
  //       // Gap found
  //       gaps.push({
  //         gapStart: previousPair.end,
  //         gapEnd: currentPair.start,
  //       });
  //     }
  //   }

  //   return { overlaps, gaps };
  // }
}

export default HtmlBuilder;
