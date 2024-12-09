import axios from "axios";
const GENSHIN_URL = "https://genshin.jmp.blue/characters";

export interface Character {
  name: string;
  id: string;
  nation: string;
  rarity: string;
  vision: string;
  weapon: string;
  image?: string;
}

export async function getAllCharacters() {
  try {
    const get_all_char_url = `${GENSHIN_URL}/all?lang=en`;
    const response = await axios.get<Character[]>(get_all_char_url);
    const data = response.data;
    // add a sort for obj.name
    data.sort((a, b) => a.name.localeCompare(b.name));
    //console.log(data);

    // Add images to all characters
    addImageToCharacter(data);
    return data;
    //return showAllCharacters(data);
  } catch (error) {
    console.error("Failed to retrieve characters", error);
  }
}

async function addImageToCharacter(data: Character[]) {
  // Set character's image if found via API
  await Promise.all(
    data.map(async (char) => {
      const image = await loadCharacterIcon(char.id);
      //console.log(image);
      char.image = image;
    })
  );
}

async function loadCharacterIcon(id: string) {
  try {
    const icon_url = `${GENSHIN_URL}/${id}/icon-big`;
    const response = await axios.get(icon_url, { responseType: "arraybuffer" });
    // Convert image from api request to proper format
    //console.log(response.data)
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const image = URL.createObjectURL(blob);
    return image;
  } catch (error) {
    console.error("Failed to fetch or convert image", error);
  }
}

async function showAllCharacters(results) {
  const allCharacters = document.getElementById("allCharacters");
  const charMap = await Promise.all(
    results.map(async (char) => {
      const image = await loadCharacterIcon(char.id);
      if (image != null) {
        return `
                <div>
                    <h1> ${char.name}  </h1>
                    <a href="/characters/${encodeURIComponent(
                      char.name
                    )}" style="text-decoration: none; color: inherit;" >
                    <img class="character-icon" src="${image}" alt="${
          char.name
        } icon"/>
                    </a>
                    <h3> ${char.nation} </h3>
                    <h3> ${char.rarity}-star ${char.vision} ${char.weapon} </h3>
                </div>
                <br>
                `;
      }
      return "";
    })
  );
  allCharacters.innerHTML = charMap.filter(Boolean).join("");
  return allCharacters;
}

async function getCharacterByName(name: string) {
  try {
    // need to handle when name is two words (ex: hu tao)
    // Misses some chars like Ayaka, Kazuha, etc.
    const noSpaceName = name.replace(" ", "-");
    const get_character_url = `${GENSHIN_URL}/${noSpaceName}?lang=en`;
    const response = await axios.get(get_character_url);
    const data = response.data;
    return showCharacter(data);
  } catch (error) {
    console.error(`Error when retrieving ${name}'s data.`, error);
  }
}

async function addCardToCharacter(data: Character[]) {
  data.map(async (char) => {
    const image = await loadCharacterCard(char.id);
    console.log(image);
    char.image = image;
  });
}

async function loadCharacterCard(id: string) {
  try {
    const card_url = `${GENSHIN_URL}/${id}/card`;
    const response = await axios.get(card_url);
    const card = JSON.stringify(response.data);
    return card;
    /*
    const imageBlob = await response.blob();
    const objectUrl = URL.createObjectURL(imageBlob);
    return objectUrl;
    */
  } catch (error) {
    console.error("Failed to load card.", error);
  }
}

async function showCharacter(characterJson) {
  const character = document.getElementById("character");
  const image = await loadCharacterCard(characterJson.id);
  let result = "";
  if (image != null) {
    result = `
                <div>
                    <h1> ${characterJson.name}  </h1>
                    <img src="${image}" alt="${characterJson.name} icon" class="character-card"/>
                    <h3> ${characterJson.nation} </h3>
                    <h3> ${characterJson.rarity}-star </h3>
                    <h3> ${characterJson.vision} ${characterJson.weapon} </h3>
                    <h3> ${characterJson.description} </h3>
                </div>
                <br>
            `;
  }
  character.innerHTML = result;
  return character;
}

async function getCharacterByWeapon(weapon: string) {}

async function getCharacterByVision(vision: string) {}

async function getCharacterByRegion(region: string) {}

/*
        Future: sort characters in front page by nation, weapon, vision, etc (dropdown)
    */
