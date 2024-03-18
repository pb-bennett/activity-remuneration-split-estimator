class SplitOp {
  split(miningOp) {
    const playerWorkTimes = miningOp.playerMembers.map((player) => {
      return {
        player: player.playerName,
        characterWorkTimes: player.characters.map((char) => {
          return { characterName: char.characterName, workTime: char.workTime() };
        }),
        playerWorkTime: player.characters.map((char) => char.workTime()).reduce((acc, cur) => acc + cur, 0),
      };
    });

    // const

    return {
      playerWorkTimes,
    };
  }
}
export default SplitOp;
