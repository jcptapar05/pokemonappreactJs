/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";

const SearchInput = () => {
 const [options, setOptions] = useState<any[]>([]);
 const [inputValue, setInputValue] = useState("");
 const [lists, setLists] = useState<any[]>([]);

 const fetchPokemon = async () => {
  try {
   const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0`
   );
   const data = await response.data;
   console.log("first");
   console.log(data.results);
   setLists(data.results);
  } catch (error) {
   console.error("Error fetching Pokémon data:", error);
   return null;
  }
 };

 useEffect(() => {
  fetchPokemon();
 }, []);

 const debouncedFetchPokemon = useMemo(
  () =>
   _.debounce(async (name) => {
    console.log(name);
    const pokemonData = lists.filter((item) => {
     return item?.name?.includes(name.toLowerCase());
    });
    console.log("pokemonData", pokemonData);
    if (pokemonData) {
     setOptions(pokemonData);
    } else {
     setOptions([]);
    }
   }, 500),
  [lists]
 );

 const handleInputChange = (_event: any, value: any) => {
  setInputValue(value);
  if (value.length > 2) {
   debouncedFetchPokemon(value);
  } else {
   setOptions([]);
  }
 };

 useEffect(() => {
  return () => {
   debouncedFetchPokemon.cancel();
  };
 }, [debouncedFetchPokemon]);

 return (
  <Container>
   <Box sx={{ bgcolor: "#f1f1f1" }}>
    <Autocomplete
     sx={{ my: 6 }}
     options={options}
     getOptionLabel={(option) => option.name || ""}
     inputValue={inputValue}
     onInputChange={handleInputChange}
     renderInput={(params) => (
      <TextField
       {...params}
       label="Search your pokemon here."
       variant="filled"
      />
     )}
     renderOption={(props, option) => (
      <li
       {...props}
       style={{
        textTransform: "capitalize",
       }}
      >
       <Link
        style={{
         display: "block",
         width: "100%",
         textTransform: "capitalize",
        }}
        to={`/${option.name}`}
       >
        <strong>{option.name}</strong>
       </Link>
      </li>
     )}
    />
   </Box>
  </Container>
 );
};

export default SearchInput;
