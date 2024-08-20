/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, Grid } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import PokemonType from "./components/PokemonType";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { colorPicker } from "./helper/colorPicker";
import LinearProgress from "@mui/material/LinearProgress";

const Details = () => {
 const route = useParams();
 const navigate = useNavigate();

 const getPokemon = async () => {
  const response = await axios.get(
   `https://pokeapi.co/api/v2/pokemon/${route.name}`
  );
  const data = await response.data;
  console.log(data);
  return data;
 };

 const {
  data: pokemon,
  status,
  isPending,
  isFetching,
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
  <Container
   style={{
    marginBottom: "30px",
   }}
  >
   {error && <p>Not found!</p>}

   {(status == "pending" || isPending || isFetching) && <Loading />}

   {status == "success" && !isFetching && (
    <>
     <Container>
      <Button
       sx={{ margin: "10px 0 30px 0" }}
       variant="text"
       color="warning"
       onClick={() => navigate(-1)}
      >
       {/* <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/"
       > */}
       &lt; Back
       {/* </Link> */}
      </Button>
     </Container>
     <Grid
      container
      spacing={2}
      style={{
       padding: "40px 0",
      }}
     >
      <Grid
       item
       xs={12}
       sm={6}
      >
       <Box
        sx={{
         display: "flex",
         color: "#fff",
         justifyContent: "center",
         alignItems: "center",
         gap: 3,
         flexWrap: "wrap",
         height: "100%",
         width: "100%",
        }}
       >
        <div
         style={{
          padding: "50px",
         }}
        >
         <p style={{ fontWeight: "bold", fontSize: "40px" }}># {pokemon?.id}</p>
         <div
          style={{
           textAlign: "center",
          }}
         >
          <img
           style={{
            height: "100%",
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
           }}
           src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
           alt=""
          />
          <div
           style={{
            maxWidth: "400px",
            width: "100%",
            height: "50px",
            marginTop: "-30px",
            borderRadius: "100%",
            background: `radial-gradient(circle, ${colorPicker(
             pokemon?.types[0]?.type?.name
            )} 0%, #000 100%)`,
            filter: "blur(16px)",
           }}
          ></div>
         </div>
        </div>
       </Box>
      </Grid>

      <Grid
       item
       xs={12}
       sm={6}
      >
       <Box
        sx={{
         color: "#fff",
         justifyContent: "center",
         alignItems: "center",
         gap: 3,
         flexWrap: "wrap",
         height: "100%",
         width: "100%",
        }}
       >
        <div>
         <h2 style={{ textTransform: "capitalize" }}>{pokemon?.name}</h2>
         <p style={{ textTransform: "capitalize" }}>
          Height: {pokemon?.height}
         </p>

         {pokemon?.types.map((item: any, index: any) => (
          <PokemonType
           key={index}
           item={item}
          ></PokemonType>
         ))}

         <Box
          sx={{
           width: "100%",
           display: "flex",
           flexDirection: "column",
           gap: "20px",
           marginTop: "30px",
          }}
         >
          {pokemon?.stats.map((stat: any, index: any) => (
           <div
            key={index}
            style={{
             display: "flex",
             flexDirection: "column",
             textTransform: "uppercase",
            }}
           >
            <span>{stat.stat.name}</span>
            <LinearProgress
             variant="determinate"
             sx={{
              marginTop: "10px",
              backgroundColor: `#aaaaaaaa`,
              "& .MuiLinearProgress-bar": {
               backgroundColor: `${colorPicker(pokemon?.types[0]?.type?.name)}`,
              },
             }}
             value={stat.base_stat}
            />
           </div>
          ))}
         </Box>
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
