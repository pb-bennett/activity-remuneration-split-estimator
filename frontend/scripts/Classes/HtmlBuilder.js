class HtmlBuilder {
  constructor() {}
  opHtml(op) {}
  _playerHtml(player) {
    const characterHtml = player.characters
      .map((character) => {
        return this._characterHtml(character, player.id);
      })
      .join("");
    return `
  <div id="opContainer" class="container-fluid borders d-flex flex-column rounded">
    <div class="row d-flex flex-column gap-1 pb-1">
      <div class="d-flex justify-content-between">
        <div class="d-flex gap-3">
          <div class="fs-6">Player: ${player.playerName}</div>
          <div class="fs-6">Characters in fleet: ${player.characters.length}</div>
        </div>
        <div class="d-flex gap-2">
          <a href="#">
            <img src="./img/pause.svg" width="16" alt="pause icon" data-playerId="${player.id}/>
          </a>
          <div>Player Work-Time: 01:04:01</div>
          <a href="#">
            <img src="./img/trash.svg" width="16" alt="pause icon" data-playerId="${player.id}/>
          </a>
        </div>
      </div>
      <div class="d-flex flex-column gap-1">
        ${characterHtml}
      </div>
    </div>
  </div>
    `;
  }
  _characterHtml(character, playerId) {
    return `
  <div class="d-flex justify-content-between borders rounded p-1">
    <div>Character: ${character.characterName}</div>
    <div class="d-flex gap-2" >
      <a class="char-pause-btn" href="#" data-characterId="${character.id}" data-playerId="${playerId}">
        <img src="./img/${character.active ? "pause" : "play"}.svg" width="12" alt="pause icon" />
      </a>
      <div>Work-Time: ${character.workTime()}</div>
      <a href="#" class="char-delete-btn" data-characterId="${character.id}" data-playerId="${playerId}">
        <img src="./img/trash.svg" width="12" alt="pause icon" />
      </a>
    </div>
  </div>
    `;
  }
}
