import { prisma } from "@/config/database";

export async function createAlarm(userId: number, chainId: number, inGwei: boolean, price: number) {
    return prisma.alarms.create({
        data: {
            userId: userId,
            chainId: chainId,
            inGwei: inGwei,
            valueGas: price 
        }
    })
}