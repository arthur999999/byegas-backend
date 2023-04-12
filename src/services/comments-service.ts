import { commentsRepository } from "@/repositories";

async function postComment(userId: number, chainId: number, text: string) {
    await commentsRepository.createAComment(userId, chainId, text)
}

export const commentsService = {
    postComment
}