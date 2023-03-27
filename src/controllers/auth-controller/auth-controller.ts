import { authService } from "../../services/auth-services/auth-services.js";
import { Request, Response } from "express";

export async function registerUser(req: Request, res: Response) {
    try {
        await authService.registerNewUser(req.body);
        res.sendStatus(200);
    } catch (error) {
        if(error.name == "invalidInfo"){
            res.status(422).send(error.message)
            return;
        }
        if(error.name == "noMatchPasswords"){
            res.status(422).send(error.message)
            return;
        }
        if(error.name == "emailExist"){
            res.status(409).send(error.message)
            return;
        }
        res.status(400).send(error.message)
    }
}