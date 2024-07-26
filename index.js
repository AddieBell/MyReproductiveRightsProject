import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Ensure node-fetch is installed
import dotenv from "dotenv";
import { stateNameToCode } from "./src/stateMappings.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cors());

const apiKey = process.env.API_KEY;
const maxRetries = 3; // Number of retries for API calls

const fetchWithRetry = async (url, options, retries = maxRetries) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries > 1) {
      console.warn(`Retrying... (${maxRetries - retries + 1})`);
      return fetchWithRetry(url, options, retries - 1);
    } else {
      throw error;
    }
  }
};

app.get("/coverage/:stateCode", async (req, res) => {
  const stateCode = req.params.stateCode;
  console.log(`Received request for state code: ${stateCode}`);
  try {
    const data = await fetchWithRetry(
      `https://api.abortionpolicyapi.com/v1/insurance_coverage/states/${stateCode}`,
      { headers: { Token: apiKey } },
      maxRetries
    );
    console.log(`Data received for state code ${stateCode}:`, data);
    const stateName = Object.keys(data)[0]; // Get the state name from the response
    if (!data[stateName]) {
      throw new Error(`No coverage data found for state: ${stateName}`);
    }
    res.json({ coverage: data[stateName] });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

app.get("/resources/:stateCode", async (req, res) => {
  const stateCode = req.params.stateCode;
  console.log(`Received resources request for state code: ${stateCode}`);
  // Fetch resources for the given state code. For now, we simulate this with a dummy response.
  // Replace this with actual API calls if you have another API endpoint for resources.
  try {
    const data = await fetchWithRetry(
      `https://api.abortionpolicyapi.com/v1/insurance_coverage/states/${stateCode}`,
      { headers: { Token: apiKey } },
      maxRetries
    );
    console.log(`Resources data received for state code ${stateCode}:`, data);
    const stateName = Object.keys(data)[0]; // Get the state name from the response
    if (!data[stateName]) {
      throw new Error(`No resources data found for state: ${stateName}`);
    }
    res.json({ results: data[stateName] }); // Adjust this according to the actual data structure
  } catch (error) {
    console.error("Error fetching resources:", error.message);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
