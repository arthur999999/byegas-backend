import { prisma } from "../src/config/database";
import * as jwt from "jsonwebtoken";
import { createSession } from "./factories/session-factory";

export async function cleanDb() {
    await prisma.alarms.deleteMany({})
    await prisma.sessions.deleteMany({})
    await prisma.telegram.deleteMany({})
    await prisma.comments.deleteMany({})
    await prisma.favorites.deleteMany({})
    await prisma.tokens.deleteMany({})
    await prisma.chains.deleteMany({})
    await prisma.image.deleteMany({})
    await prisma.users.deleteMany({})
}

export async function createValidToken(userId: number) {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
    await createSession(token, userId);
    return token
}