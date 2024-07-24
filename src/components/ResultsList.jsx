import PropTypes from "prop-types";

const ResultsList = ({ results }) => {
  return (
    <div>
      <h2>Results</h2>
      <ul className='list-group'>
        {results.map((result) => (
          <li key={result.id} className='list-group-item'>
            <h5>{result.name}</h5>
            <p>{result.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

ResultsList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ResultsList;
