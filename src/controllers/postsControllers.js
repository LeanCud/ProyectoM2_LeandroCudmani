import pool from "../db/config.js";

export const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    
    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Error Obteniendo Posts");

    res.status(500).json({error: "Error Obteniendo Posts"});
  }
};

export const getPostById = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [req.params.id]);

    if (result.rows.length === 0 ) {
      return res.status(400).json({error: "Post no encontrado"});
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Error Obteniendo Post");

    res.status(500).json({error: "Error Obteniendo Post"});
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body

    if (!title || !content || !author_id) {
      return res.status(400).json({error: "Titulo, Contenido y Autor son requeridos"});
    }

    const result = await pool.query(`INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *`, [title, content, author_id, published || false]);

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("Error Creando Post", error);

    res.status(500).json({error: "Error Creando Post"});
  }
}