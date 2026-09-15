CREATE TABLE authors (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  bio        TEXT,
  create_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT NOT NULL,
  author_id  INTEGER NOT NULL,
  published  BOOLEAN DEFAULT FALSE,
  create_at  TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);