import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";
import MapComponent from "./components/MapComponent";

function App() {
  const [results, setResults] = useState([]);
  const [coverageMessage, setCoverageMessage] = useState("");

  const handleSearch = async (city, state) => {
    const apiUrl = `https://api.example.com/resources?city=${city}&state=${state}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setResults(data);
  };

  const handleStateClick = (message) => {
    setCoverageMessage(message);
  };

  return (
    <div>
      <Navbar />
      <div className='container mt-3'>
        <SearchForm onSearch={handleSearch} />
        <MapComponent onStateClick={handleStateClick} />
        <ResultsList results={results} />
        {coverageMessage && (
          <div className='alert alert-info mt-3'>{coverageMessage}</div>
        )}
      </div>
    </div>
  );
}

export default App;
