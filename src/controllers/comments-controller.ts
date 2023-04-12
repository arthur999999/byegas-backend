import { notFoundError } from "@/erros";
import { AuthenticatedRequest } from "@/middlewares";
import { chainsService, commentsService } from "@/services";
import { Response } from "express";

export async function createComment(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const chainId = Number(req.params.chainId)
    const text = req.body.comment

    try {
        await chainsService.getAChain(chainId, userId)
        await commentsService.postComment(userId, chainId, text)
        res.sendStatus(200);
    } catch (error) {
        if(error.name === "NotFoundError") {
            res.status(404).send(error.message)
            return
        }
        res.status(400).send(error.message)
    }
}