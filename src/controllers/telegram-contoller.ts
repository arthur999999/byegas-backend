import { notFoundError } from "@/erros";
import { AuthenticatedRequest } from "@/middlewares";
import { telegramService } from "@/services";
import { Response } from "express";

export async function getUserTelegram(req: AuthenticatedRequest, res: Response) {

    const {userId} = req

    try {

        const telegram = await telegramService.findTelegramByUser(userId)
        if(!telegram) {
            throw notFoundError("This user dont have a registered telegram")
        }
        res.status(200).send(telegram)
    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}

export async function postTelegram(req: AuthenticatedRequest, res: Response) {
    
}