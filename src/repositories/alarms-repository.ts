import { prisma } from "@/config/database";
import { alarms } from "@prisma/client";
import { number } from "joi";

async function getAllAlarms(userId: number) {
    return prisma.alarms.findMany({
        where: {
            userId: userId
        },
        include: {
            chains: true
        }
    })
}

async function getAlarmPrice(inGwei: boolean, chainId: number) {
    return prisma.alarms.findMany({
        where: {
            inGwei: false,
            chainId: chainId
        },
    })
}

async function createOrUpdateAlarms(userId: number, chainId: number, body: Omit<alarms,  "userId" | "chainId" | "createdAt" | "updatedAt">) {
    return prisma.alarms.upsert({
        where: {
            id: body.id
        },
        create: {
            userId: userId,
            chainId: chainId,
            inGwei: body.inGwei,
            valueGas: body.valueGas
        },
        update: {
            inGwei: body.inGwei,
            valueGas: body.valueGas
        }
    })
}

export const alarmsRepositories = {
    getAllAlarms,
    createOrUpdateAlarms,
    getAlarmPrice
}