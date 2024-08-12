import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import axios from "axios";

const Pokemons = () => {
 const [lists, setLists] = useState([]);
 const [limit, setLimit] = useState(20);

 useEffect(() => {
  const fetchPokemons = () => {
   axios(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`).then(
    (response) => {
     const pokemonList = response.data.results;
     const tempArr = [];

     pokemonList.map((pokemonItem) => {
      axios.get(pokemonItem.url).then((item) => {
       const details = item.data;
       console.log(details);
       tempArr.push({
        id: details.id,
        name: details.name,
        image: details.sprites.front_default,
        types: details.types,
       });

       setLists((prev) => (prev = tempArr));
      });
     });
    }
   );
  };

  fetchPokemons();
 }, [limit]);

 return (
  <div>
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
    {lists.map((pokemon, index) => (
     <Pokemon
      pokemon={pokemon}
      key={index}
     />
    ))}
   </Box>

   <button onClick={() => setLimit((prev) => prev + 20)}>Limit</button>
  </div>
 );
};

export default Pokemons;
