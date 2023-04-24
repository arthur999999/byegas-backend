import { telegramRepository } from "../repositories"
import { randomBytes } from 'crypto';



async function findTelegramByUser(userId: number) {
    const telegram = await telegramRepository.getTelegramByUserId(userId)
    return telegram;
}

async function findTelegramByToken(token: string) {
    const user = await telegramRepository.findTelegram(token)
    return user
}

async function generateTokenForTelegram(userId:number) {
    const token = randomBytes(3).toString('hex').toUpperCase();
    await telegramRepository.createTelegram(userId, token)
    return token
    
}

async function updateTelegram(telegramId: string, id: number) {
    await telegramRepository.updateTelegram(id, telegramId)
}

export const telegramService = {
    findTelegramByUser,
    generateTokenForTelegram,
    findTelegramByToken,
    updateTelegram
}