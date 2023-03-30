import { AuthenticatedRequest } from "@/middlewares";
import { chainsService } from "@/services";
import { Response } from "express";

export async function listChains(req: AuthenticatedRequest, res: Response ) {
    const { userId } = req

    try {
        const list = await chainsService.getAllChainsWithTokens(userId)
        const resp = await chainsService.getGasPrice(list)
        res.status(200).send(resp)
    } catch (error) {
        res.status(400).send(error.message)
    }
}