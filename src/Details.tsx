/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
        <Button
         disabled
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
      </div>
     </Box>
    </Grid>
   </Grid>
  </Container>
 );
};

export default Details;
