import React, { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import MapComponent from "./components/MapComponent.jsx";
import ResultsList from "./components/ResultsList.jsx";
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
    <div className='App'>
      <h1>Reproductive Rights Resources</h1>
      <SearchForm onSearch={handleSearch} />
      <MapComponent onStateClick={handleStateClick} />
      <ResultsList
        stateName={stateName}
        results={searchResults.length > 0 ? searchResults : mapResults}
      />
      {coverageMessage && <p>{coverageMessage}</p>}
    </div>
  );
}

export default App;
