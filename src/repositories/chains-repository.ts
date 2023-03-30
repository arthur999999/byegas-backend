import { prisma } from "@/config/database";

async function getAllChainsAndTokens() {
    return prisma.chains.findMany({
        include: {
            tokens: true
        }
    })
}

export const chainsRepository = {
    getAllChainsAndTokens
}