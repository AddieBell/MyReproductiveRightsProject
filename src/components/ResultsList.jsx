import PropTypes from "prop-types";

const ResultsList = ({ results }) => {
  return (
    <div className='results-list'>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className='result-item'>
            {typeof result === "string" ? (
              <p>{result}</p>
            ) : (
              <div>
                <strong>
                  {result.key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  :
                </strong>{" "}
                {result.value}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
};

export default ResultsList;
