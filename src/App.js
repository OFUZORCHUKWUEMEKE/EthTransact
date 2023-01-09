import {BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import Crypto from "./pages/Crypto";
import Home from "./pages/Home";
function App() {
  return (
    <>
        <Router>
           <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route  path="/prices" element={<Crypto/>}/>
           </Routes>
        </Router>
    </>
  );
}

export default App;
