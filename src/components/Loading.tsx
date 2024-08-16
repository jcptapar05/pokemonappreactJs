import { CircularProgress } from "@mui/material";

const Loading = () => {
 return (
  <div style={{ textAlign: "center", color: "#fff", margin: "20px 0" }}>
   <CircularProgress color="warning" />
  </div>
 );
};

export default Loading;
