import { prisma } from "../src/config/database";

export async function cleanDb() {
    await prisma.alarms.deleteMany({})
    await prisma.sessions.deleteMany({})
    await prisma.telegram.deleteMany({})
    await prisma.comments.deleteMany({})
    await prisma.favorites.deleteMany({})
    await prisma.image.deleteMany({})
    await prisma.tokens.deleteMany({})
    await prisma.chains.deleteMany({})
    await prisma.users.deleteMany({})
}