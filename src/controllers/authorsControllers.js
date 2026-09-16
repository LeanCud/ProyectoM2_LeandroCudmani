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

export const getAuthorById = async (req, res) => {
  try {

    const result = await pool.query(`SELECT * FROM authors WHERE id = $1`, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Autor no encontrado",});
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Error obteniendo autor:", error);
    
    res.status(500).json({error: "Error obteniendo autor"});
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { name , email, bio } = req.body

    if (!name || !email ) {
      return res.status(400).json({error: "Error Nombre y Email son requeridos"});
    }

    const result = await pool.query ("INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *", [name, email, bio || null]);

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error({error: "Error Creando Autor"});

    if (error.code === "23505") {
      return res.status(409).json({error: "El Email ya esta Registrado"});
    }
    
    res.status(500).json({error: "Error creando Autor"});
  }
};

export const updateAuthor = async (req, res) => {
  try {
      const { id } = req.params
  const { name, email, bio } = req.body

  if (!name || ! email) {
    return res.status(400).json({error : "El Nombre y el Email son requeridos"});
  }

  const result = await pool.query(`UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *`, [name, email, bio || null, id]);

  if (result.rows.length === 0) {
    return res.status(404).json({error: "Autor no encontrado",});
  }

  res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Error Actualizando Autor", error);

    if (error.code === "23505") {
      return res.status(409).json({error: "El Email ya fue registrado"});
    }

    res.status(500).json({error: "Error Actualizando Autor"});
  }
};

