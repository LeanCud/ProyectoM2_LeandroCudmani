const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "El id debe ser un número entero positivo",
    });
  }

  next();
};

export const validateAuthor = (req, res, next) => {
  const { name, email, bio } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      error: "El nombre es requerido",
    });
  }

  if (name.trim().length > 100) {
    return res.status(400).json({
      error: "El nombre no puede superar los 100 caracteres",
    });
  }

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      error: "El email es requerido",
    });
  }

  if (email.trim().length > 255 || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      error: "El email no tiene un formato válido",
    });
  }

  if (bio !== undefined && bio !== null && typeof bio !== "string") {
    return res.status(400).json({
      error: "La biografía debe ser texto",
    });
  }

  next();
};

export const validatePost = (req, res, next) => {
  const { title, content, author_id, published } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "El título es requerido",
    });
  }

  if (title.trim().length > 255) {
    return res.status(400).json({
      error: "El título no puede superar los 255 caracteres",
    });
  }

  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      error: "El contenido es requerido",
    });
  }

  if (!Number.isInteger(Number(author_id)) || Number(author_id) <= 0) {
    return res.status(400).json({
      error: "author_id debe ser un entero positivo",
    });
  }

  if (published !== undefined && typeof published !== "boolean") {
    return res.status(400).json({
      error: "published debe ser booleano",
    });
  }

  next();
};
