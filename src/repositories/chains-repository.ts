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

async function getChain(chainId: number, userId: number) {
    return prisma.chains.findUnique({
        where: {
            id: chainId
        },
        include: {
            tokens: true,
            favorites: {
                where: {
                    userId: userId,
                }
            },
            comments: true,
            alarms: {
                where: {
                    userId: userId
                }
            }
        }
    })
}

export const chainsRepository = {
    getAllChainsAndTokens,
    getChain
}