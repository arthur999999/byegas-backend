import { AuthenticatedRequest } from "@/middlewares";
import { chainsService } from "@/services";
import axios from "axios";
import { Response } from "express";

export async function listChains(req: AuthenticatedRequest, res: Response ) {
    try {
        const list = await chainsService.getAllChainsWithTokens()
        const resp = await chainsService.getGasPrice(list)
        res.status(200).send(resp)
    } catch (error) {
        res.status(400).send(error.message)
    }
}