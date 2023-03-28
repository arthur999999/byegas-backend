import prisma from "../../config/database.js"

async function createSession(token: string, userId: number) {
    return prisma.sessions.create({
        data: {
            userId: userId,
            token: token
        }
    })
}

export const sessionRepository = {
    createSession
}