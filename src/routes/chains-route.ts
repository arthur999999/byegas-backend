import { getSpecificChain, listChains } from "@/controllers";
import { validateToken } from "@/middlewares";
import { Router } from "express";

const chainRouter = Router();

chainRouter
    .all("/*", validateToken)
    .get('/list/all', listChains)
    .get('/:chainId', getSpecificChain);

export { chainRouter };