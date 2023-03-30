import { prisma } from "@/config/database";

async function getAllChainsAndTokens(userId: number) {
    return prisma.chains.findMany({
        include: {
            tokens: true,
            favorites: {
                where: {
                    userId: userId,
                }
            }
        }
    })
}

export const chainsRepository = {
    getAllChainsAndTokens
}