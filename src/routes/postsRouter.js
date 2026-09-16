import { Router } from "express";
import { createPost, getAllPosts, getPostById } from "../controllers/postsControllers.js";


const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:id", getPostById);
// postsRouter.get("/") GET /posts/author/:authorId
postsRouter.post("/", createPost);
// postsRouter.update("/id:", );
// postsRouter.delete("/id:", );

export default postsRouter;