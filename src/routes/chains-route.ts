import { listChains } from "@/controllers";
import { validateToken } from "@/middlewares";
import { Router } from "express";

const chainRouter = Router();

chainRouter
    .all("/*", validateToken)
    .get('/list/all', listChains);

export { chainRouter };