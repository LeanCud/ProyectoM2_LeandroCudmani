import { Router } from "express";
import { validateAuthor, validateId } from "../middlewares/validators.js";
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/authorsControllers.js";

const authorsRouter = Router();

authorsRouter.get("/", getAllAuthors);
authorsRouter.get("/:id", validateId, getAuthorById);
authorsRouter.post("/", validateAuthor, createAuthor);
authorsRouter.put("/:id", validateId, validateAuthor, updateAuthor);
authorsRouter.delete("/:id", validateId, deleteAuthor);

export default authorsRouter;