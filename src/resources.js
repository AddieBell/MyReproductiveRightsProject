import pool from "./db.js";

export const fetchResources = async (city, state) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM resources WHERE city = ? AND state = ?",
      [city, state]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};
