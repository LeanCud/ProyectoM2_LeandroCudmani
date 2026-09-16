import { Router } from "express";
import { createAuthor, getAllAuthors, getAuthorById } from "../controllers/authorsControllers.js";

const authorsRouter = Router();

authorsRouter.get("/", getAllAuthors);
authorsRouter.get("/:id", getAuthorById);
authorsRouter.post("/", createAuthor);
// authorsRouter.put("/:id");
// authorsRouter.delete("/:id");

export default authorsRouter;