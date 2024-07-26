import React from "react";
import PropTypes from "prop-types";

const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatValue = (key, value) => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  } else if (
    key.toLowerCase().includes("last updated") &&
    !isNaN(Date.parse(value))
  ) {
    return new Date(value).toLocaleDateString();
  }
  return value;
};

const moreInfoContent = (key) => {
  switch (key) {
    case "exchange_coverage_no_restrictions":
      return "This indicates that there are no restrictions on coverage provided through insurance exchanges.";
    case "medicaid_coverage_provider_patient_decision":
      return "This indicates that Medicaid coverage is provided based on the decision made by the provider and patient.";
    case "requires_coverage":
      return "This indicates that coverage is required by law for the specified services.";
    case "last_updated":
      return "This is the date when the data was last updated.";
    default:
      return "No additional information available.";
  }
};

const ResultsList = ({ stateName, results }) => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <h2>Results for {stateName}:</h2>
      {/* <h3>{stateName}</h3> */}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <strong>{formatKey(result.key)}:</strong>{" "}
            {formatValue(result.key, result.value)}
            <details>
              <summary>(more info)</summary>
              <p>{moreInfoContent(result.key)}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

ResultsList.propTypes = {
  stateName: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
};

export default ResultsList;
