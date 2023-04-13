import { notFoundError } from "@/erros";
import { AuthenticatedRequest } from "@/middlewares";
import { telegramService } from "@/services";
import { Response } from "express";

export async function getUserTelegram(req: AuthenticatedRequest, res: Response) {

    const {userId} = req
    try {
        const telegram = await telegramService.findTelegramByUser(userId)
        if(telegram) {
            if(telegram.userTelegram.length === 6) {
                res.status(200).send(telegram.userTelegram)
                return
            }
            res.status(200).send("Telegram already registered")
            return
        }
        const token = await telegramService.generateTokenForTelegram(userId)
        res.status(200).send(token)
    } catch (error) {
        res.status(400).send(error.message)
    }


}
