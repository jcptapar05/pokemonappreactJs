import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Notmatch from "./Notmatch";
import Details from "./Details";

// Not familiar with MUI

function App() {
 return (
  <div>
   <Routes>
    <Route
     index
     element={<Home />}
    />

    <Route
     path="/:id"
     element={<Details />}
    />

    <Route
     path="*"
     element={<Notmatch />}
    />
   </Routes>
   <Outlet />
  </div>
 );
}

export default App;
