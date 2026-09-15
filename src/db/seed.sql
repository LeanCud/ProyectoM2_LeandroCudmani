INSERT INTO authors (name, email, bio) VALUES
 ('Ana Garcia', 'ana@example.com', 'Desarrolladora full-stack'),
 ('Carlos Ruiz', 'carlos@example.com', 'Escritor Tecnico'),
 ('Maria lopez', 'maria@example.com', 'Ingenieria de APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
 ('Introduccion a Node.js', 'Node.js es un runtime...', 1, TRUE),
 ('PostgreSQL vs MySQL', 'Ambas tienen ventajas...', 2, TRUE),
 ('APIs RESTful', 'REST es un estilo...', 1, TRUE),
 ('Manejo de errores en Express', 'El manejo apropiado...', 3, FALSE),
 ('Async/Await explicado', 'Las promesas...', 1, FALSE)