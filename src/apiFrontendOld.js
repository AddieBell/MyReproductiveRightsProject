import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY; // Use API key from .env for frontend

export const fetchMedicaidCoverageFrontend = async (stateCode) => {
  if (!stateCode) {
    console.error(
      "fetchMedicaidCoverageFrontend called with undefined stateCode"
    );
    return "State code is undefined";
  }

  const apiUrl = `https://api.abortionpolicyapi.com/v1/insurance_coverage/states/${stateCode}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const stateData = response.data[stateCode];

    if (stateData) {
      const medicaidKeys = Object.keys(stateData).filter(
        (key) => key.includes("medicaid") && stateData[key] === true
      );

      const coverageDescriptions = medicaidKeys.map((key) =>
        key.split("_").slice(2).join(" ")
      );

      return `In ${stateCode}, Medicaid covers abortion when it's: ${coverageDescriptions.join(
        ", "
      )}.`;
    } else {
      return `No data found for state: ${stateCode}`;
    }
  } catch (error) {
    return `Error fetching data: ${error.message}`;
  }
};
