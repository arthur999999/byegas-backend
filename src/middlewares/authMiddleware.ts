import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken"

export async function validateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const header = req.header("Authorization")
    if(!header) {
        res.sendStatus(401)
        return;
    }
    
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};