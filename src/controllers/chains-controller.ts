import { AuthenticatedRequest } from "@/middlewares";
import { chainsService } from "@/services";
import { Response } from "express";

export async function listChains(req: AuthenticatedRequest, res: Response ) {
    const { userId } = req

    try {
        const list = await chainsService.getAllChainsWithTokens(userId)
        const dataList = await chainsService.getGasPrice(list)
        const resp = chainsService.organizeInCrescentSequence(dataList);
        res.status(200).send(resp)
    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}

export async function getSpecificChain(req: AuthenticatedRequest, res: Response ) {
    const { userId } = req
    const chainId = req.params.chainId

    try {
        const chain = await chainsService.getAChain(Number(chainId), userId);
        const resp = await chainsService.getGasAndPriceToken(chain, false)

        res.status(200).send(resp)
    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}

export async function getFavoritesChains(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    try {
        const list = await chainsService.getFavorites(userId)
        const dataList = await chainsService.getGasPrice(list)
        const resp = chainsService.organizeInCrescentSequence(dataList);

        res.status(200).send(resp)
    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}

export async function postFavoriteChain(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const chainId = Number(req.params.chainId)
    try {
        await chainsService.getAChain(chainId, userId)
        await chainsService.verifyFavoriteExist(userId, chainId)
        await chainsService.postChainFavorite(userId, chainId)
        res.sendStatus(200)

    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        if(error.name == "ConflictError") {
            res.status(406).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}