"use client";

import { Button, HStack } from "@chakra-ui/react";
import { CharacterGrid } from "../components/ui/CharacterGrid";
import { Character, getAllCharacters } from "@/utils/genshinFunctions";
import styles from "./page.module.css";
import React, {useEffect, useState} from "react";



export default function Home() {
  //const chars = await getAllCharacters();
  const [chars, setCharacters] = useState<Character[] | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      const data = await getAllCharacters();
      if (data) {
        setCharacters(data);
      }
    }

    fetchCharacters();
  }, []);

  if (!chars) {
    return <p>Loading...</p>; // Add a loading state
  }

  /*
  const cards = chars.map((char) => (
    <div key={char.id}>
      <Image src={char.image || ""} alt={char.name} />
    </div>
  ));
  */
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>All Characters</h1>
        <CharacterGrid characters={chars}/>
      </main>
    </div>
  );
}
