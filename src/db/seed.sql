INSERT INTO authors (name, email, bio) VALUES
 ("Ana Garcia", "ana@example.com", "Desarrolladora full-stack"),
 ("Carlos Ruiz", "carlos@example.com", "Escritor Tecnico"),
 ("Maria Lopez", "maria@example.com", "Ingenieria de APIs REST");

 INSERT INTO posts (title, content, author_id, published) VALUES
  ("Introduccion a Node.js", "Node.js es un runtime...", 1, TRUE),
  ("PostgreSQL vs MySQL", "Ambas tienen ventajas...", 2, TRUE),
  ("APIs RESTful", "REST es un estilo...", 3, FALSE),
  ("Manejo de errores de Express", "El manejo apropiado...", 1, FALSE),
  ("Async/Await explicado", "Las promesas...", 3, TRUE)