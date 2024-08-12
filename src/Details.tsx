/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokemonType from "./components/PokemonType";

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
  <Container>
   <Button sx={{ marginTop: "50px" }}>
    <Link to="/">Back</Link>
   </Button>
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
       height: "80vh",
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
       height: "80vh",
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
       <p style={{ textTransform: "capitalize" }}>{pokemon?.id}</p>
       <p style={{ textTransform: "capitalize" }}>Height: {pokemon?.name}</p>

       {pokemon?.types.map((item: any) => (
        <PokemonType item={item}></PokemonType>
       ))}
      </div>
     </Box>
    </Grid>
   </Grid>
  </Container>
 );
};

export default Details;
