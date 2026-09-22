import { Router } from "express";
import { validateId, validatePost } from "../middlewares/validators.js";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postsControllers.js";


const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:id", validateId, getPostById);
// postsRouter.get("/") GET /posts/author/:authorId
postsRouter.post("/", validatePost, createPost);
postsRouter.put("/:id", validateId, validatePost, updatePost);
postsRouter.delete("/:id", validateId, deletePost);

export default postsRouter;