/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";

const PokemonType = ({ item }: { item: any }) => {
 return (
  <Button
   key={item.slot}
   size="small"
   style={{
    color: "#fff",
    borderRadius: "30px",
    fontSize: "10PX",
    background: `
  ${
   item.type.name == "fire"
    ? "red"
    : item.type.name == "water"
    ? "blue"
    : item.type.name == "grass"
    ? "green"
    : item.type.name == "fighting"
    ? "brown"
    : item.type.name == "normal"
    ? ""
    : item.type.name == "ground"
    ? "orange"
    : item.type.name == "physic"
    ? "teal"
    : item.type.name == "rock"
    ? "grey"
    : item.type.name == "poison"
    ? "violet"
    : item.type.name == "electric"
    ? "yellow"
    : item.type.name == "ice"
    ? "indigo"
    : item.type.name == "bug"
    ? "black"
    : item.type.name == "dragon"
    ? "yellowgreen"
    : item.type.name == "fairy"
    ? "aero"
    : item.type.name == "normal"
    ? "cyan"
    : item.type.name == "ghost"
    ? "bronze"
    : ""
  }
  `,
   }}
  >
   {item.type.name}
  </Button>
 );
};

export default PokemonType;
