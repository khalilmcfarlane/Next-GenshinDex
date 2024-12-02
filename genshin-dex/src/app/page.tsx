import { Button, HStack } from "@chakra-ui/react";
import styles from "./page.module.css";

export default function Home() {
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
