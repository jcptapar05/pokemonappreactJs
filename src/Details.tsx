import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
 const route = useParams();

 console.log(route.id);
 return <div>Details</div>;
};

export default Details;
