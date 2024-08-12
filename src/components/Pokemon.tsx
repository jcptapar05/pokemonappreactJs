/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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
     ))}
    </CardActions>
   </Card>
  </Link>
 );
}
