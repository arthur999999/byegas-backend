import { AuthenticatedRequest } from "@/middlewares";
import { imageService } from "@/services";
import { Response } from "express";

export async  function postImage(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const { url } = req.body

    try {
        let id: number = 0
        const image = await imageService.getImage(userId)
        if(image){
            id = image.id
        }
        await imageService.postImage(userId, url, id)
        res.sendStatus(200)
    } catch (error) {
        res.send(error.message).status(400)
    }
}