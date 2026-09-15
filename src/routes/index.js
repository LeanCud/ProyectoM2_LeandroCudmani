import { Router } from "express";
import authorsRouter from "./authorsRouter.js";

const router = Router();

router.use("/authors", authorsRouter);


export default router;