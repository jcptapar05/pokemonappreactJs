/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import PokemonType from "./PokemonType";

export default function Pokemon({ pokemon }: any) {
 return (
  <Link to={`/${pokemon.id}`}>
   <Card
    sx={{ width: 345 }}
    style={{ backgroundColor: "#1a1a1a" }}
   >
    <CardMedia
     component="img"
     alt="green iguana"
     height="140"
     image={pokemon?.image}
     sx={{ objectFit: "contain" }}
    />
    <CardContent>
     <Typography
      variant="h5"
      component="div"
      color="#fff"
      style={{ textAlign: "center", textTransform: "uppercase" }}
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
