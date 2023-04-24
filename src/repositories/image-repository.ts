import { prisma } from "../config/database";

async function createImage(userId:number, imageUrl: string, id: number){
    return prisma.image.upsert({
        where:{
            id: id
        },
        update:{
            imageUrl: imageUrl
        },
        create: {
            userId: userId,
            imageUrl: imageUrl
        }
    })
}

async function getImage(userId: number){
    return prisma.image.findFirst({
        where:{
            userId: userId
        }
    })
}

export const imageRepository = {
    createImage,
    getImage
}