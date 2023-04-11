import { notFoundError } from "@/erros";
import { AuthenticatedRequest } from "@/middlewares";
import { chainsService } from "@/services";
import { alarmsService } from "@/services/alarms-service";
import { Response } from "express";

export async function listAlarms(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    try {
        const alarms = await alarmsService.listAllAlarms(userId)
        if(!alarms[0]) {
            throw notFoundError("No alarms for this user");
        }
        res.status(200).send(alarms)
    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}

export async function postAlarm(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const chainId = Number(req.params.chainId)
    const body = req.body
    try {
        const chain = await chainsService.getAChain(chainId, userId)
        if(!chain) {
            throw notFoundError("this chain not exist")
        }
        await alarmsService.createOrUpdateAlarm(userId, chainId, body)
        res.sendStatus(200);
    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}