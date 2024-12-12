import { Character } from "@/utils/genshinFunctions";
import Link from "next/link";
import { Button, Card, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import classes from "../css/PostGrid.module.css";

interface CharacterProps {
  characters: Character[];
}
export function CharacterGrid({ characters }: CharacterProps) {
  const cards = characters.map((character) => (
    <Link
      key={character.id}
      href={`/posts/${character.id}`}
      style={{ textDecoration: "none" }}
      passHref
    >
      <Card.Root maxW="sm" overflow="hidden">
        <Image
          src={character.image}
          alt={character.name}
        />
        <Card.Body gap="2">
          <Card.Title>{character.name}</Card.Title>
          <Text
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            {character.nation}
            <br></br>
            {character.rarity}-star {character.vision} {character.weapon}
          </Text>
        </Card.Body>
        <Card.Footer gap="2">
        </Card.Footer>
      </Card.Root>
    </Link>
  ));

  return (
   <Grid>
    <GridItem/>
    {cards}
    <GridItem />
   </Grid>
  );
}
