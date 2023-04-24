import { prisma } from "../config/database";
import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken"

export async function validateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const header = req.header("Authorization")
    if(!header) {
        res.sendStatus(401)
        return;
    }
    
    const token = header.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await prisma.sessions.findFirst({
      where: {
        token,
      },
    });
    if (!session) return res.sendStatus(401);
    req.userId = userId;
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};