import { Router } from "express";
import { getAllAuthors } from "../controllers/authorsControllers.js";

const authorsRouter = Router();

authorsRouter.get("/", getAllAuthors);
// authorsRouter.get("/:id");
// authorsRouter.post("/");
// authorsRouter.put("/:id");
// authorsRouter.delete("/:id");

export default authorsRouter;