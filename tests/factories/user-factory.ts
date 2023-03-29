import { prisma } from "@/config/database";
import  { faker } from "@faker-js/faker"
import bcrypt from "bcrypt";

export async function createUser() {
    const realPassword = faker.internet.password(6)
    return { prismaReturn: await (prisma.users.create({
        data:{
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync( realPassword, 10)
        }
    })),
    password: realPassword
     }
}

export function createRegister() {
    const password = faker.internet.password(6);
    const body = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: password,
            confirmPassword: password
    }
    return body
}