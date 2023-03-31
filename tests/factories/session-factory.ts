import { prisma } from "@/config/database";

export async function createSession(token: string, userId: number) {
    return prisma.sessions.create({
        data: {
            userId: userId,
            token: token
        }
    })
}