/* eslint-disable @typescript-eslint/no-explicit-any */
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
     image={pokemon.image}
     sx={{ objectFit: "contain" }}
    />
    <CardContent>
     <Typography
      gutterBottom
      variant="h5"
      component="div"
      color="#fff"
      style={{ textAlign: "center" }}
     >
      {pokemon.name}
     </Typography>
    </CardContent>
    <CardActions>
     {/* {types.map((item) => (
     <Button size="small">{item}</Button>
    ))} */}
    </CardActions>
   </Card>
  </Link>
 );
}
