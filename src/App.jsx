import { useState } from "react";
import SearchForm from "./components/SearchForm";
import MapComponent from "./components/MapComponent";
import ResultsList from "./components/ResultsList";

function App() {
  const [results, setResults] = useState([]);
  const [coverageMessage, setCoverageMessage] = useState("");

  const handleSearch = async (city, stateName) => {
    console.log(`City: ${city}, State: ${stateName}`);
    try {
      const response = await fetch(
        `http://localhost:3000/resources?city=${encodeURIComponent(
          city
        )}&state=${stateName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleStateClick = async (stateName) => {
    console.log(`State clicked: ${stateName}`);
    try {
      const response = await fetch(
        `http://localhost:3000/coverage/${stateName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const formattedCoverage = Object.entries(data.coverage).map(
        ([key, value]) => ({
          key,
          value: key === "state_code" ? value : value ? "Yes" : "No",
        })
      );
      console.log("Formatted Coverage:", formattedCoverage); // Log the fetched and formatted data
      setCoverageMessage(`Coverage for ${stateName}`);
      setResults(formattedCoverage);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className='App'>
      <h1>Reproductive Rights Resources</h1>
      <SearchForm onSearch={handleSearch} />
      <MapComponent onStateClick={handleStateClick} />
      <ResultsList results={results} />
      <p>{coverageMessage}</p>
    </div>
  );
}

export default App;
