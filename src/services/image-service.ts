import { imageRepository } from "@/repositories";

async function postImage(userId: number, imageUrl: string, id: number){
    await imageRepository.createImage(userId, imageUrl, id)
}

async function getImage(userId: number) {
    const image = await imageRepository.getImage(userId)
    return image
}

export const imageService = {
    postImage,
    getImage
}