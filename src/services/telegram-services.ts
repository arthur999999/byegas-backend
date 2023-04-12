import { telegramRepository } from "@/repositories"

async function findTelegramByUser(userId: number) {
    const telegram = await telegramRepository.getTelegramByUserId(userId)
    return telegram;
}

export const telegramService = {
    findTelegramByUser
}