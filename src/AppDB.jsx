// import { useState } from "react";
import SearchForm from "./components/SearchFormDB";
// import MapComponent from "./components/MapComponent";
// import ResultsList from "./components/ResultsList";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import "./styles.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        {/* <p>{coverageMessage}</p> */}
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<SearchForm />} />
      </Routes>
    </Router>
  );

  // return (
  //   <Router>
  //     <div>
  //       <nav>
  //         <ul>
  //           <li>
  //             <Link to="/">Home</Link>
  //           </li>
  //           <li>
  //             <Link to="/about">About</Link>
  //           </li>
  //           <li>
  //             <Link to="/search">Search</Link>
  //           </li>
  //         </ul>
  //       </nav>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/about" element={<About />} />
  //         <Route path="/search" element={<SearchForm />} />
  //       </Routes>
  //     </div>
  //   </Router>
  // );
}

export default App;
