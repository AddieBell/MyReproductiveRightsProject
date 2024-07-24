import { useState } from "react";
import PropTypes from "prop-types";

function SearchForm({ onSearch }) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city, state);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-3'>
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
