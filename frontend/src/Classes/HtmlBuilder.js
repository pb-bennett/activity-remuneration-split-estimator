class HtmlBuilder {
  constructor() {}
  opHtml(op) {
    let opWorkTime = 0;
    const playersHtml = op.playerMembers
      .map((player) => {
        const playerHtmlObj = this._playerHtmlObj(player);
        opWorkTime = opWorkTime += playerHtmlObj.playerWorkTime;
        return playerHtmlObj.html;
      })
      .join("");
    return `
      <div class= "op-container d-flex flex-column gap-1 borders rounded p-1">
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
          <a href="#">
            <img src="./img/plus.svg" width="36" alt="pause icon">
          </a>
          <a href="#">
            <img src="./img/${op.isActive ? "pause" : "play"}.svg" width="36" alt="pause icon">
          </a>
          <div class="d-flex flex-column gap-1">
            <div>Duration: 63 mins</div>
            <div>Operation Work-Time: ${this._formatTime(opWorkTime)}</div>
          </div>
          <a href="#">
            <img src="./img/trash.svg" width="36" alt="pause icon">
          </a>
        </div>
        </div>
        <div class="players-container d-flex flex-column gap-1 p-1">
        ${playersHtml}
        </div>
        </div>
  
    `;
  }
  _playerHtmlObj(player) {
    const playerWorkTime = player.characters.map((char) => char.workTime()).reduce((acc, cur) => acc + cur, 0);
    const characterHtml = player.characters
      .map((character) => {
        return this._characterHtml(character, player.id);
      })
      .join(" ");
    return {
      html: `
  <div class="container-fluid borders d-flex flex-column rounded py-1 player-container">
    <div class="row d-flex flex-column gap-1 pb-1">
      <div class="d-flex justify-content-between">
        <div class="d-flex gap-3">
          <div class="fs-6">Player: ${player.playerName}</div>
          <div class="fs-6">Characters in fleet: ${player.characters.length}</div>
        </div>
        <div class="d-flex gap-2">
      <a href="#">
        <img src="./img/plus.svg" width="16" alt="plus icon" data-playerId="${player.id}">
      </a>
      <a href="#">
        <img src="./img/pause.svg" width="16" alt="pause icon"  />
      </a>
      <div>Player Work-Time: ${this._formatTime(playerWorkTime)}</div>
      <a href="#">
        <img src="./img/trash.svg" width="16" alt="pause icon" />
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
  _characterHtml(character, playerId) {
    return `
  <div class="d-flex justify-content-between borders rounded p-1">
    <div>Character: ${character.characterName}</div>
    <div class="d-flex gap-2" >
      <a class="char-pause-btn" href="#" data-characterId="${character.id}" data-playerId="${playerId}">
        <img src="./img/${character.isActive ? "pause" : "play"}.svg" width="12" alt="pause icon" />
      </a>
      <div>Work-Time: ${this._formatTime(character.workTime())}</div>
      <a href="#" class="char-delete-btn" data-characterId="${character.id}" data-playerId="${playerId}">
        <img src="./img/trash.svg" width="12" alt="pause icon" />
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
}

export default HtmlBuilder;
