/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
 const route = useParams();
 const [pokemon, setPokemon] = useState<any>();

 useEffect(() => {
  const getPokemon = () => {
   axios
    .get(`https://pokeapi.co/api/v2/pokemon/${route.id}`)
    .then((response) => {
     console.log(response.data);
     setPokemon(response.data);
    });
  };

  getPokemon();
 }, []);

 return (
  <Grid
   container
   spacing={2}
  >
   <Grid
    item
    xs={6}
   >
    <Box
     sx={{
      display: "flex",
      height: "100vh",
      color: "#fff",
      justifyContent: "center",
      alignItems: "center",
      mt: 1,
      mb: 10,
      gap: 3,
      flexWrap: "wrap",
     }}
    >
     <div>
      <img
       style={{ height: "300px", objectFit: "contain" }}
       src={pokemon?.sprites.front_default}
       alt=""
      />
     </div>
    </Box>
   </Grid>

   <Grid
    item
    xs={6}
   >
    <Box
     sx={{
      display: "flex",
      height: "100vh",
      color: "#fff",
      justifyContent: "center",
      alignItems: "center",
      mt: 1,
      mb: 10,
      gap: 3,
      flexWrap: "wrap",
     }}
    >
     <div>
      <h2 style={{ textTransform: "capitalize" }}>{pokemon?.name}</h2>
     </div>
    </Box>
   </Grid>
  </Grid>
 );
};

export default Details;
