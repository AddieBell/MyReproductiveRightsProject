import PropTypes from "prop-types";

const ResultsList = ({ stateName, results }) => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className='mt-4'>
      <h3>Results:</h3>
      <h4>{stateName}</h4>
      <ul className='list-group'>
        {results.map(({ key, value }) => (
          <li key={key} className='list-group-item bg-dark text-white'>
            <details>
              <summary>{key.replace(/_/g, " ").toUpperCase()}</summary>
              {value}
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

ResultsList.propTypes = {
  stateName: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ResultsList;
