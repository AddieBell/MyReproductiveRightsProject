import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { stateNameToCode } from "./src/stateMappings.js";
import pool from "./src/db.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

app.get("/coverage/:stateName", async (req, res) => {
  const stateName = req.params.stateName;
  const stateCode = stateNameToCode[stateName];
  if (!stateCode) {
    res.status(404).send(`No data found for state: ${stateName}`);
    return;
  }
  try {
    const query = "SELECT * FROM coverage WHERE state_code = ?";
    const [rows] = await pool.query(query, [stateCode]);
    if (rows.length > 0) {
      res.json({ coverage: rows[0] });
    } else {
      res.status(404).send(`No data found for state: ${stateName}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/resources", async (req, res) => {
  const { city, state } = req.query;
  try {
    const query = "SELECT * FROM resources WHERE city = ? AND state = ?";
    const [rows] = await pool.query(query, [city, state]);
    res.json({ results: rows });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
