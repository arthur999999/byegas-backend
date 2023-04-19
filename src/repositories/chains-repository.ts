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

async function getOnlyChain() {
    return prisma.chains.findMany({})
}

async function getFavoriteChains(userId: number) {
    return prisma.favorites.findMany({
        where: {
            userId: userId
        },
        include: {
            chains: {
                include: {
                    tokens: true,
                    favorites: {
                        where: {
                            userId: userId
                        }
                    }
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
            comments: {
                include:{
                    users: {
                        select:{
                            name: true,
                            image: true
                        }
                    },
                }
            },
            alarms: {
                where: {
                    userId: userId
                }
            }
        }
    })
}

async function createFavorite(userId: number, chainId: number){
    return prisma.favorites.create({
        data:{
            userId: userId,
            chainId: chainId
        }
    })
}

async function findFavorite(userId: number, chainId: number) {
    return prisma.favorites.findFirst({
        where:{
            userId: userId,
            chainId: chainId
        }
    })
}

async function deleteFavorite(id: number) {
    return prisma.favorites.delete({
        where:{
            id: id
        }
    })
}

async function getAllToken(){
    return prisma.tokens.findMany({})
}

export const chainsRepository = {
    getAllChainsAndTokens,
    getChain,
    getFavoriteChains,
    createFavorite,
    findFavorite,
    deleteFavorite,
    getOnlyChain,
    getAllToken
}