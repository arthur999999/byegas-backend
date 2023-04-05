import { deleteFavorite, getFavoritesChains, getSpecificChain, listChains, postFavoriteChain } from "@/controllers";
import { validateToken } from "@/middlewares";
import { Router } from "express";

const chainRouter = Router();

chainRouter
    .all("/*", validateToken)
    .get('/list/all', listChains)
    .get('/listone/:chainId', getSpecificChain)
    .get('/favorites', getFavoritesChains)
    .post('/favorite/:chainId', postFavoriteChain)
    .delete('/favorite/:chainId', deleteFavorite);

export { chainRouter };