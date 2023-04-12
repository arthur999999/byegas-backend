import { prisma } from "@/config/database";

async function getTelegramByUserId(userId: number) {
    return prisma.telegram.findFirst({
        where: {
            userId: userId
        }
    })
}

async function createTelegram(userId: number, userTelegram: string) {
    return prisma.telegram.create({
        data: {
            userId: userId,
            userTelegram: userTelegram
        }
    })
}

async function updateTelegram(id: number, userTelegram: string) {
    return prisma.telegram.update({
        where: {
            id: id
        },
        data: {
            userTelegram: userTelegram
        }
    })
}

export const telegramRepository = {
    getTelegramByUserId,
    createTelegram,
    updateTelegram
}