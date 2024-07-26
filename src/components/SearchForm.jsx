import { useState } from "react";
import PropTypes from "prop-types";
import MapComponent from "./MapComponent";
import ResultsList from "./ResultsList";
import { stateNameToCode } from "../stateMappings.js";

const SearchForm = ({
  onSearch,
  onStateClick,
  searchResults,
  mapResults,
  coverageMessage,
  stateName,
}) => {
  const [state, setState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedState = state.trim().toLowerCase();
    const stateName =
      normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1);
    const stateCode =
      stateNameToCode[stateName] ||
      stateNameToCode[normalizedState.toUpperCase()];
    if (stateCode) {
      onSearch(stateName); // Pass the state name to the parent component
    } else {
      alert("Invalid state name or code");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            Users from Hawaii and Alaska, please use State input rather than
            map.
          </p>
          <label>
            State:
            <input
              type='text'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <button type='submit'>Search</button>
      </form>
      <MapComponent onStateClick={onStateClick} />
      <ResultsList
        stateName={stateName}
        results={searchResults.length > 0 ? searchResults : mapResults}
      />
      {coverageMessage && <p>{coverageMessage}</p>}
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onStateClick: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  mapResults: PropTypes.array.isRequired,
  coverageMessage: PropTypes.string.isRequired,
  stateName: PropTypes.string.isRequired,
};

export default SearchForm;
