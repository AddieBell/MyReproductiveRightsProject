const apiKey = import.meta.env.VITE_API_KEY;

export const fetchCoverageData = async (stateCode) => {
  try {
    const response = await fetch(
      `https://api.abortionpolicyapi.com/v1/insurance_coverage/states/${stateCode}`,
      {
        headers: { Token: apiKey },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
