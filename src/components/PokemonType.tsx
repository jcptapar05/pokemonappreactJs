/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import { colorPicker } from "../helper/colorPicker";

const PokemonType = ({ item }: { item: any }) => {
 return (
  <Button
   key={item.slot}
   size="small"
   style={{
    color: "#fff",
    borderRadius: "30px",
    fontSize: "10PX",
    marginRight: "10px",
    background: `
  ${colorPicker(item.type.name)}
  `,
   }}
  >
   {item.type.name}
  </Button>
 );
};

export default PokemonType;
