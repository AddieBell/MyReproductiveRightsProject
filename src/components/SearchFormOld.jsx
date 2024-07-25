import { useState } from "react";
import PropTypes from "prop-types";
import { stateNameToCode } from "../stateMappings";
import { fetchMedicaidCoverageFrontend } from "../apiFrontend"; // Import frontend API handler

function SearchForm({ onSearch }) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("State input:", state); // Log the state input
    const stateCode = stateNameToCode[state];
    if (stateCode) {
      try {
        const message = await fetchMedicaidCoverageFrontend(stateCode);
        onSearch(message);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    } else {
      console.error("State code is undefined for state name:", state);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-3 mt-40'>
      <div className='mb-3'>
        <label htmlFor='city' className='form-label'>
          City
        </label>
        <input
          type='text'
          className='form-control'
          id='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='state' className='form-label'>
          State
        </label>
        <input
          type='text'
          className='form-control'
          id='state'
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Search
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
