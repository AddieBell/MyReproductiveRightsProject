import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { stateNameToCode } from "./stateMappings.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [mapResults, setMapResults] = useState([]);
  const [coverageMessage, setCoverageMessage] = useState("");
  const [stateName, setStateName] = useState("");

  const handleSearch = async (stateName) => {
    console.log(`State: ${stateName}`);
    const stateCode = stateNameToCode[stateName];
    if (!stateCode) {
      console.error(`Invalid state name: ${stateName}`);
      return;
    }
    setCoverageMessage(""); // Clear the coverage message when a new search is made
    try {
      const response = await fetch(
        `http://localhost:3000/resources/${stateCode}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const formattedResults = Object.entries(data.results).map(
        ([key, value]) => ({
          key,
          value: value ? "true" : "false",
        })
      );
      setSearchResults(formattedResults);
      setMapResults([]); // Clear map results when a new search is made
      setStateName(stateName); // Set the state name for display
    } catch (error) {
      console.error("Fetch error:", error);
      setSearchResults([]); // Clear search results on error
      setStateName(""); // Clear the state name on error
    }
  };

  const handleStateClick = async (stateName) => {
    console.log(`State clicked: ${stateName}`);
    const stateCode = stateNameToCode[stateName];
    if (!stateCode) {
      console.error(`Invalid state name: ${stateName}`);
      return;
    }
    console.log(`State code for ${stateName}: ${stateCode}`); // Add this line
    setCoverageMessage(""); // Clear the coverage message when a new state is clicked
    try {
      const response = await fetch(
        `http://localhost:3000/coverage/${stateCode}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.coverage) {
        throw new Error(`No coverage data found for state: ${stateCode}`);
      }
      const formattedCoverage = Object.entries(data.coverage).map(
        ([key, value]) => ({
          key,
          value: key === "state_code" ? value : value ? "true" : "false",
        })
      );
      console.log("Formatted Coverage:", formattedCoverage); // Log the fetched and formatted data
      setCoverageMessage(`Coverage for ${stateName}`);
      setMapResults(formattedCoverage);
      setSearchResults([]); // Clear search results when a state is clicked
      setStateName(stateName); // Set the state name for display
    } catch (error) {
      console.error("Fetch error:", error);
      setCoverageMessage(
        `Error fetching coverage for ${stateName}: ${error.message}`
      );
      setStateName(""); // Clear the state name on error
    }
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route
            path='/search'
            element={
              <SearchForm
                onSearch={handleSearch}
                onStateClick={handleStateClick}
                searchResults={searchResults}
                mapResults={mapResults}
                coverageMessage={coverageMessage}
                stateName={stateName}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
