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
    <div class="op-container d-flex flex-column gap-1 borders rounded p-1 overflow-auto" data-opId="${op.id}">
      <div class="d-flex justify-content-between op-header py-1 px-2 align-items-center">
        <a href="#" class="ars-btn op-edit-btn p-1 op-btn" data-btnScope="op" data-btnType="edit">
          <img src="./img/edit.svg" alt="edit icon" />
        </a>
        <div class="d-flex flex-column gap-1">
          <div class="h5 p-2 m-0">Foreman: ${op.fleetLeader}</div>
          <div class="fs-6 px-2 py-0 m-0 d-flex justify-content-between">
            <div>Started:</div>
            <div>${op.startTime.toLocaleTimeString("en-GB", { timeZone: "Atlantic/Reykjavik", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </div>
        <div class="h5 p-2 m-0 d-flex justify-content-center align-items-center">
          <div class="px-4">${op.fleetName}</div>
          <a href="#" class="ars-btn op-split-btn p-1 op-btn" data-btnScope="op" data-btnType="split">
            <img src="./img/split2.svg" alt="split icon" />
          </a>
        </div>
        <div class="d-flex gap-4 align-items-center">
          <a href="#" class="ars-btn op-add-btn op-btn2" data-btnScope="op" data-btnType="add">
            <img src="./img/plus.svg"  alt="add icon" data-btnScope="op" data-btnType="add" />
          </a>
          <a href="#" class="ars-btn op-pause-btn op-btn2" data-btnScope="op" data-btnType="pause"> 
            <img src="./img/${op.isActive ? "pause" : "play"}.svg"  alt="pause icon"> 
          </a>
          <div class="d-flex flex-column gap-1">
            <div>Operation Work-Time: <span class="timer" data-timertype="opWorkTime">${this.formatTime(opWorkTime)}</span></div>
          </div>
          <a href="#" class="ars-btn op-delete-btn op-btn2" data-btnScope="op" data-btnType="delete">
            <img src="./img/trash.svg"  alt="delete icon" />
          </a>
        </div>
      </div>
      <div class="test players-container d-flex flex-column gap-1 p-1">${playersHtml}</div>
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
          <div class="d-flex gap-3 align-items-center">
            <a href="#" class="ars-btn player-edit-btn p-1 player-btn" data-btnScope="player" data-btnType="edit">
              <img src="./img/edit.svg" alt="edit icon" />
            </a>
            <div class="fs-6">Player: ${player.playerName}</div>
            <div class="fs-6">Characters in fleet: ${player.characters.length}</div>
          </div>
          <div class="d-flex gap-2 align-items-center">
            <a href="#" class="ars-btn player-add-btn p-1 player-btn" data-btnScope="player" data-btnType="add">
              <img src="./img/plus.svg" alt="plus icon" />
            </a>
            <a href="#" class="ars-btn player-pause-btn p-1 player-btn" data-btnScope="player" data-btnType="pause"> <img src="./img/${player.isActive ? "pause" : "play"}.svg" alt="pause icon" /> </a>
            <div>Player Work-Time: <span class="timer" data-timertype="playerWorkTime">${this.formatTime(playerWorkTime)}</span></div>
            <a href="#" class="ars-btn player-delete-btn p-1 player-btn" data-btnScope="player" data-btnType="delete">
              <img src="./img/trash.svg" alt="delete icon" data-btnScope="player" data-btnType="delete" />
            </a>
          </div>
        </div>
        <div class="characters-container d-flex flex-column gap-1">${characterHtml}</div>
      </div>
    </div>
    `,
      playerWorkTime,
    };
  }
  _characterHtml(character) {
    return `
  <div class="d-flex justify-content-between borders rounded p-1 character-container" data-characterId="${character.id}">
    <div class="d-flex gap-2 align-items-center">
    <a href="#" class="ars-btn character-edit-btn p-1 character-btn" data-btnScope="character" data-btnType="edit">
    <img src="./img/edit.svg"  alt="pause icon" />
    </a>  
    <div>Character: ${character.characterName}</div>
    </div>
    <div class="d-flex gap-2 align-items-center" >
      <a class="ars-btn character-pause-btn p-1 character-btn" href="#"" data-btnScope="character" data-btnType="pause">
        <img src="./img/${character.isActive ? "pause" : "play"}.svg"  alt="pause icon" />
      </a>
      <div>Work-Time: <span class="timer" data-timertype="characterWorkTime">${this.formatTime(character.workTime())}</span></div>
    <a href="#" class="ars-btn character-delete-btn p-1 character-btn" data-btnScope="character" data-btnType="delete">
    <img src="./img/trash.svg"  alt="pause icon" />
      </a>
    </div>
  </div>
    `;
  }
  formatTime(ms) {
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
