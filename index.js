import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;
const apiKey = process.env.API_KEY;

app.use(cors());

const stateCodeToName = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

app.get("/coverage/:stateCode", async (req, res) => {
  const stateCode = req.params.stateCode;
  const stateName = stateCodeToName[stateCode];
  console.log(`Received coverage request for state code: ${stateCode}`);
  try {
    const response = await fetch(
      `https://api.abortionpolicyapi.com/v1/insurance_coverage/states/${stateCode}`,
      {
        headers: { Token: apiKey },
      }
    );

    console.log(`API response status: ${response.status}`);
    const data = await response.json();
    console.log(`Data received from API for state code ${stateCode}:`, data);

    if (!data[stateName]) {
      console.error(`No coverage data found for state: ${stateCode}`);
      return res
        .status(404)
        .json({ error: `No coverage data found for state: ${stateCode}` });
    }

    console.log(`Coverage data for state code ${stateCode}:`, data[stateName]);
    res.json({ coverage: data[stateName] });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/resources/:stateCode", async (req, res) => {
  const stateCode = req.params.stateCode;
  const stateName = stateCodeToName[stateCode];
  console.log(`Received resources request for state code: ${stateCode}`);
  try {
    const response = await fetch(
      `https://api.abortionpolicyapi.com/v1/insurance_coverage/states/${stateCode}`,
      {
        headers: { Token: apiKey },
      }
    );

    console.log(`API response status: ${response.status}`);
    const data = await response.json();
    console.log(`Data received from API for state code ${stateCode}:`, data);

    if (!data[stateName]) {
      console.error(`No resources data found for state: ${stateCode}`);
      return res
        .status(404)
        .json({ error: `No resources data found for state: ${stateCode}` });
    }

    console.log(`Resources data for state code ${stateCode}:`, data[stateName]);
    res.json({ results: data[stateName] });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
