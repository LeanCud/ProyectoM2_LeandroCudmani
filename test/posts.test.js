import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import request from "supertest";

import app from "../src/app.js";
import pool from "../src/db/config.js";

beforeEach(async () => {
  await pool.query("TRUNCATE posts, authors RESTART IDENTITY CASCADE");

  await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)`,
    ["Ana Garcia", "ana@test.com", "Desarrolladora"],
  );

  await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)`,
    ["Mi primer post", "Contenido del post", 1, true],
  );
});

afterAll(async () => {
  await pool.end();
});

describe("Rutas de posts", () => {
  it("GET /posts devuelve todos los posts", async () => {
    const response = await request(app).get("/posts");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("Mi primer post");
  });

  it("GET /posts/:id devuelve un post", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Mi primer post");
  });

  it("GET /posts/:id devuelve 404 si no existe", async () => {
    const response = await request(app).get("/posts/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Post no encontrado",
    });
  });

  it("GET /posts/:id rechaza un id inválido", async () => {
    const response = await request(app).get("/posts/abc");

    expect(response.status).toBe(400);
  });

  it("POST /posts crea un post", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Nuevo post",
        content: "Contenido nuevo",
        author_id: 1,
        published: false,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Nuevo post");
  });

  it("POST /posts rechaza datos inválidos", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "",
        content: "",
        author_id: 1,
      });

    expect(response.status).toBe(400);
  });

  it("POST /posts devuelve 404 si el autor no existe", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Post sin autor",
        content: "Contenido",
        author_id: 999,
        published: false,
      });

    expect(response.status).toBe(404);
  });

  it("PUT /posts/:id actualiza un post", async () => {
    const response = await request(app)
      .put("/posts/1")
      .send({
        title: "Post actualizado",
        content: "Contenido actualizado",
        author_id: 1,
        published: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Post actualizado");
  });

  it("DELETE /posts/:id elimina un post", async () => {
    const response = await request(app).delete("/posts/1");

    expect(response.status).toBe(200);
    expect(response.body.post.id).toBe(1);
  });

  it("DELETE /posts/:id devuelve 404 si no existe", async () => {
    const response = await request(app).delete("/posts/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Post no encontrado",
    });
  });
});