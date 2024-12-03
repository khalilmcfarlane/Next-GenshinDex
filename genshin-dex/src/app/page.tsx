import { Button, HStack } from "@chakra-ui/react";
import { getAllCharacters } from "@/utils/genshinFunctions";
import styles from "./page.module.css";

export default async function Home() {
  const chars = await getAllCharacters();
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HStack>
          <Button>Click me</Button>
          <Button>Click me</Button>
        </HStack>
      </main>
    </div>
  );
}
