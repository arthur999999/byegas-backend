import { prisma } from "../config/database";
import { newUser } from "../protocols";

async function postNewUser(body: newUser) {
    return prisma.users.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
            updatedAt: body.updatedAt,
        }
    })
}

async function findUserByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
        },
        include:{
            image: true
        }
    })
}


export const userRepository = {
    postNewUser,
    findUserByEmail
}