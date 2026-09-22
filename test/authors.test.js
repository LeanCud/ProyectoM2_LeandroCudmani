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
  await pool.query("TRUNCATE authors RESTART IDENTITY CASCADE");

  await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)`,
    ["Ana Garcia", "ana@test.com", "Desarrolladora"],
  );
});

afterAll(async () => {
  await pool.end();
});

describe("Rutas de autores", () => {
  describe("GET /authors", () => {
    it("devuelve todos los autores", async () => {
      const response = await request(app).get("/authors");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe("Ana Garcia");
      expect(response.body[0].email).toBe("ana@test.com");
    });
  });

  describe("GET /authors/:id", () => {
    it("devuelve un autor existente", async () => {
      const response = await request(app).get("/authors/1");

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Ana Garcia");
    });

    it("devuelve 404 si el autor no existe", async () => {
      const response = await request(app).get("/authors/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: "Autor no encontrado",
      });
    });

    it("devuelve 400 si el id no es válido", async () => {
      const response = await request(app).get("/authors/abc");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "El id debe ser un número entero positivo",
      );
    });
  });

  describe("POST /authors", () => {
    it("crea un autor", async () => {
      const response = await request(app)
        .post("/authors")
        .send({
          name: "Carlos Ruiz",
          email: "carlos@test.com",
          bio: "Escritor",
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Carlos Ruiz");
      expect(response.body.email).toBe("carlos@test.com");
    });

    it("rechaza un nombre vacío", async () => {
      const response = await request(app)
        .post("/authors")
        .send({
          name: "",
          email: "correo@test.com",
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("El nombre es requerido");
    });

    it("rechaza un email duplicado", async () => {
      const response = await request(app)
        .post("/authors")
        .send({
          name: "Otra persona",
          email: "ana@test.com",
          bio: "Otra biografía",
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe("El Email ya esta Registrado");
    });
  });

  describe("PUT /authors/:id", () => {
    it("actualiza un autor", async () => {
      const response = await request(app)
        .put("/authors/1")
        .send({
          name: "Ana Actualizada",
          email: "ana.nueva@test.com",
          bio: "Nueva biografía",
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Ana Actualizada");
      expect(response.body.email).toBe("ana.nueva@test.com");
    });

    it("devuelve 404 si el autor no existe", async () => {
      const response = await request(app)
        .put("/authors/999")
        .send({
          name: "Autor inexistente",
          email: "inexistente@test.com",
          bio: "Sin autor",
        });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Autor no encontrado");
    });

    it("devuelve 400 si el id no es válido", async () => {
      const response = await request(app)
        .put("/authors/abc")
        .send({
          name: "Autor",
          email: "autor@test.com",
        });

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /authors/:id", () => {
    it("elimina un autor", async () => {
      const response = await request(app).delete("/authors/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Autor eliminado correctamente",
      );
    });

    it("devuelve 404 si el autor no existe", async () => {
      const response = await request(app).delete("/authors/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Autor no encontrado");
    });

    it("devuelve 400 si el id no es válido", async () => {
      const response = await request(app).delete("/authors/abc");

      expect(response.status).toBe(400);
    });
  });
});