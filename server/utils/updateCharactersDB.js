const Character = require("../models/characterModel");

exports.updateCharactersDB = async () => {
  const url = process.env.EVE_WHO_CORP_API_URL;
  const corpsIds = [98664079, 98657953];

  for (const corpId of corpsIds) {
    console.log(`${url}${corpId}`);
    const rawMembers = await fetch(`${url}${corpId}`);
    const membersObj = await rawMembers.json();
    // console.log(membersObj);
    const members = membersObj.characters.map((member) => {
      return {
        characterId: member.character_id,
        characterName: member.name,
        corporationId: corpId,
      };
    });
    await Character.deleteMany({});
    await Character.insertMany(members);
    console.log(members);
  }
};
