import { useState } from "react";
import MapComponent from "./MapComponent";
import ResultsList from "./ResultsList";

const SearchForm = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSearch(city, state);
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
    <>
      <MapComponent onStateClick={handleStateClick} />

      <form onSubmit={handleSubmit}>
        {/* <div>
        <label>
          City:
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
      </div> */}
        <div>
          <label>
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
      <ResultsList results={results} />
    </>
  );
};

export default SearchForm;
