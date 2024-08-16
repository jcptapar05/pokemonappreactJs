/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, Grid } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PokemonType from "./components/PokemonType";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading";
import { useEffect } from "react";

const Details = () => {
 const route = useParams();

 const getPokemon = async () => {
  const response = await axios.get(
   `https://pokeapi.co/api/v2/pokemon/${route.name}`
  );
  const data = await response.data;
  return data;
 };

 const {
  data: pokemon,
  status,
  isPending,
  refetch,
  error,
 } = useQuery({
  queryKey: ["details"],
  queryFn: getPokemon,
 });

 useEffect(() => {
  refetch();
 }, [route]);

 return (
  <Container>
   {error && <p>Not found!</p>}
   {isPending && <Loading />}
   {status == "success" && (
    <>
     <Button
      sx={{ marginTop: "50px" }}
      variant="text"
      color="primary"
     >
      <Link
       style={{ textDecoration: "none", color: "white" }}
       to="/"
      >
       &lt; Home
      </Link>
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
          style={{ height: "200px", objectFit: "contain" }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`}
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

         {pokemon?.types.map((item: any, index: any) => (
          <PokemonType
           key={index}
           item={item}
          ></PokemonType>
         ))}
        </div>
       </Box>
      </Grid>
     </Grid>
    </>
   )}
  </Container>
 );
};

export default Details;
