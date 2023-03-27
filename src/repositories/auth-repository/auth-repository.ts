import prisma from "../../config/database.js";
import { newUser } from "../../protocols.js";

async function postNewUser(body: newUser) {
    return prisma.users.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
            createdAt: body.createdAt,
            updatedAt: body.updatedAt,
        }
    })
}

async function findUserByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

export const authRepository = {
    postNewUser,
    findUserByEmail
}