import { prisma } from "../config/database";

async function createAComment(userId: number, chainId: number, text: string) {
    return prisma.comments.create({
        data: {
            userId: userId,
            chainId: chainId,
            text: text
        }
    })
}

export const commentsRepository = {
    createAComment
}