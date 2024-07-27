import PropTypes from "prop-types";

const ResultsList = ({ stateName, results }) => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <h2>Results:</h2>
      <h3>{stateName}</h3>
      <ul>
        {results.map(({ key, value }) => (
          <li key={key}>
            {key.replace(/_/g, " ").toUpperCase()}: {value}
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
