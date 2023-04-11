import { alarmsRepositories } from "@/repositories/alarms-repository";
import { alarms } from "@prisma/client";

async function listAllAlarms(userId: number) {
    const list = await alarmsRepositories.getAllAlarms(userId)
    return list
}

async function createOrUpdateAlarm(userId: number, chainId: number, body: Omit<alarms,  "userId" | "chainId" | "createdAt" | "updatedAt">) {
    await alarmsRepositories.createOrUpdateAlarms(userId, chainId, body);
}

export const alarmsService = {
    listAllAlarms,
    createOrUpdateAlarm
}