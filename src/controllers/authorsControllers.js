import pool from "../db/config.js";

export const getAllAuthors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors");

    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Error obteniendo autores:", error);

    res.status(500).json({error: "Error obteniendo autores"});
  }
};