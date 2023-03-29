import { authService } from "@/services";
import { Request, Response } from "express";
import { emailExist, emailNotFound, noMatchPasswords } from "@/services";

export async function registerUser(req: Request, res: Response) {

    const  newUser = req.body

    try {
        const email = await authService.findUserEmail(newUser.email)
        if(email) {
            throw emailExist();
        }
        if(newUser.password !== newUser.confirmPassword) {
            throw noMatchPasswords();
        }
        await authService.createUser(newUser);
        res.sendStatus(200);
    } catch (error) {
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

export async function loginUser(req: Request, res: Response) {
    const user = req.body

    try {
        const userSearch = await authService.findUserEmail(user.email)

        if(!userSearch) {
            throw emailNotFound();
        }
        await authService.validatePassword(user.password, userSearch.password)
        const token = await authService.createSession(userSearch.id)
        res.status(200).send(token);
    } catch (error) {
        if(error.name == "emailNotFound"){
            res.status(404).send(error.message)
            return;
        }


        res.status(400).send(error.message)
    }
}