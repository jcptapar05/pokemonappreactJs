/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import axios from "axios";
import Loading from "./Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const Pokemons = () => {
 const [limit] = useState<number>(20);

 const { ref, inView } = useInView();

 const fetchPokemons = async ({ pageParam }: { pageParam: number }) => {
  console.log("pageParam: ", pageParam);
  const response = await axios(
   `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );
  const data = await response.data;
  // console.log("data = ", data.results);

  const tempArr: any[] = [];
  data.results.map(async (item: any) => {
   const res = await axios.get(item.url);
   const d = await res.data;
   tempArr.push(d);
  });

  return { results: tempArr, offset: pageParam };
 };

 const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
  useInfiniteQuery({
   queryKey: ["projects"],
   queryFn: fetchPokemons,
   initialPageParam: 0,
   getNextPageParam: (lastPage) => {
    return lastPage.offset + 20;
   },
  });

 useEffect(() => {
  if (inView) {
   fetchNextPage();
  }
 }, [inView]);

 const combinedResults = data?.pages.reduce((acc, page: any) => {
  return acc.concat(page.results);
 }, []);

 return (
  <div style={{ position: "relative" }}>
   <div style={{ position: "fixed", top: "10px" }}>
    <h1 style={{ color: "white" }}>Lists: {combinedResults?.length}</h1>
   </div>

   {error && (
    <div style={{ textAlign: "center", color: "#fff" }}>
     <h2>Error no data found!</h2>
    </div>
   )}

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
    {status == "success" &&
     combinedResults?.map((pokemon, index) => (
      <Pokemon
       key={index}
       pokemon={pokemon}
      />
     ))}
   </Box>

   {(status == "pending" || isFetching || isFetchingNextPage) && <Loading />}

   {status == "success" && (
    <>
     <div ref={ref}></div>
     <div style={{ marginBottom: "30px", textAlign: "center" }}>
      <Button
       variant="contained"
       onClick={() => fetchNextPage}
      >
       Load More
      </Button>
     </div>
    </>
   )}
  </div>
 );
};

export default Pokemons;
