/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import PokemonType from "./PokemonType";
import _ from "lodash";
import { useState } from "react";

export default function Pokemon({ pokemon }: any) {
 const [over, setOver] = useState(false);

 return (
  <Link
   to={`/${pokemon.name}`}
   style={{ textDecoration: "none" }}
  >
   <Card
    onMouseOver={() => setOver(true)}
    onMouseOut={() => setOver(false)}
    className="pokemoncard"
    sx={{ width: 300, padding: "20px" }}
    style={{ backgroundColor: "#1a1a1a", borderRadius: "16px" }}
   >
    <Typography
     sx={{
      fontSize: 14,
      color: "#fff",
      marginBottom: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
     }}
     gutterBottom
    >
     # {pokemon?.id}
     <img
      src={
       `./Types/${_.capitalize(pokemon.types[0].type.name)}.svg` ||
       "./Types/Normal.svg"
      }
      alt=""
      height={30}
     />
    </Typography>

    <CardMedia
     component="img"
     alt="green iguana"
     id="pokeminimg"
     height="100"
     image={
      !over
       ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`
       : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`
     }
     sx={{ objectFit: "contain" }}
    />
    <CardContent>
     <Typography
      variant="h5"
      component="div"
      color="#fff"
      style={{
       textAlign: "center",
       textTransform: "capitalize",
       textDecoration: "none",
      }}
     >
      {pokemon?.name}
     </Typography>
    </CardContent>
    <CardActions>
     {pokemon?.types.map((item: any) => (
      <PokemonType item={item}></PokemonType>
     ))}
    </CardActions>
   </Card>
  </Link>
 );
}
