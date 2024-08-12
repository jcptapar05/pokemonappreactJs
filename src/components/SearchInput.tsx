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

 const fetchPokemon = async (name: any) => {
  try {
   const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`
   );
   return response.data;
  } catch (error) {
   console.error("Error fetching Pokémon data:", error);
   return null;
  }
 };

 const debouncedFetchPokemon = useMemo(
  () =>
   _.debounce(async (name) => {
    const pokemonData = await fetchPokemon(name.toLowerCase());
    if (pokemonData) {
     setOptions([pokemonData]);
    } else {
     setOptions([]);
    }
   }, 1000),
  []
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
     freeSolo
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
      <li {...props}>
       <Link to={`/${option.id}`}>
        <strong>{option.name}</strong> - ID: {option.id}
       </Link>
      </li>
     )}
    />
   </Box>
  </Container>
 );
};

export default SearchInput;
