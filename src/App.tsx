import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Notmatch from "./Notmatch";
import Details from "./Details";
import SearchInput from "./components/Search";

// Not familiar with MUI

function App() {
 return (
  <div>
   <SearchInput />
   <Routes>
    <Route
     index
     element={<Home />}
    />

    <Route
     path="/:name"
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
