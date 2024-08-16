/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import axios from "axios";
import Loading from "./Loading";

const Pokemons = () => {
 const [lists, setLists] = useState<any[]>([]);
 const [limit, setLimit] = useState<number>(20);
 const [offset, setOffset] = useState<number>(0);
 const [loading, setLoading] = useState<boolean>(false);

 useEffect(() => {
  const fetchPokemons = () => {
   axios(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
   ).then((response) => {
    setLoading(false);
    const pokemonList = response.data.results;
    const tempArr: any[] = [];

    pokemonList.map((pokemonItem: any) => {
     axios.get(pokemonItem.url).then((item) => {
      const details = item.data;
      // console.log(details);
      tempArr.push({
       id: details.id,
       name: details.name,
       image: details.sprites.front_default,
       types: details.types,
      });

      const newArr = [...lists, ...tempArr];

      setLists(newArr);
     });
    });
   });
  };

  fetchPokemons();

  window.addEventListener("scroll", (e: any) => {
   const bottom =
    e.target.scrollingElement.scrollHeight -
     Math.floor(e.target.scrollingElement.scrollTop) ===
    e.target.scrollingElement.clientHeight;
   if (bottom) {
    console.log("Bottom");
    setLoading(!loading);
    // setLimit((prev: number) => (prev += 20));
    setOffset((prev: number) => prev + 20);
   }
  });
 }, [limit, offset]);

 return (
  <div style={{ position: "relative" }}>
   <div style={{ position: "fixed", top: "10px" }}>
    <h1 style={{ color: "white" }}>
     Lists: {lists.length} - Limit {limit} - offset {offset}
    </h1>
   </div>
   <Box
    sx={{
     display: "flex",
     justifyContent: "center",
     mt: 1,
     mb: 10,
     gap: 3,
     flexWrap: "wrap",
    }}
   >
    {lists.length >= 1 ? (
     lists.map((pokemon) => (
      <Pokemon
       key={pokemon.id}
       pokemon={pokemon}
      />
     ))
    ) : (
     <Loading />
    )}
   </Box>

   {loading && <Loading />}

   <div style={{ marginBottom: "30px", textAlign: "center" }}>
    <Button
     variant="contained"
     onClick={() => {
      setLoading(true);
      setOffset((prev: number) => prev + 20);
     }}
    >
     Load More
    </Button>
   </div>
  </div>
 );
};

export default Pokemons;
