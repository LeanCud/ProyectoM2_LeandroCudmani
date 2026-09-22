import pool from "../db/config.js";

export const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    
    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Error Obteniendo Posts", error);

    res.status(500).json({error: "Error Obteniendo Posts"});
  }
};

export const getPostById = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Post no encontrado"});
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Error Obteniendo Post", error);

    res.status(500).json({error: "Error Obteniendo Post"});
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body

    const result = await pool.query(`INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *`, [title, content, author_id, published || false]);

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("Error Creando Post", error);

    if (error.code === "23503") {
      return res.status(404).json({error: "El Autor no existe"});
    }

    res.status(500).json({error: "Error Creando Post"});
  }
}

export const updatePost = async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body
    const { id } = req.params

    const result = await pool.query(`UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *`, [title.trim(), content.trim(), author_id, published || false, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Post no encontrado"});
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Error Actualizando Post", error);

    if (error.code === "23503") {
      return res.status(404).json({error: "El Autor no existe"});
    }

    res.status(500).json({error: "Error Actualizando Post"});
  }
  };

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Post no encontrado"});
    }

    res.status(200).json({
      message: "Posts eliminado correctamente",
      post: result.rows[0]
    });

  } catch (error) {
    console.error("Error Eliminando Post", error);

    res.status(500).json({error: "Error Eliminando Post"});
  }
};