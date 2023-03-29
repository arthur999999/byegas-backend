import { credentialInvalid } from "./error";
import { userRepository } from "../../repositories/user-repository/user-repository";
import { newUser } from "../../protocols";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sessionRepository } from "../../repositories/session-repository/index";


async function createUser(newUser) {
    const user: newUser = {
        name: newUser.name,
        email: newUser.email,
        password: bcrypt.hashSync(newUser.password, 10),
        updatedAt: new Date()
    }
    await userRepository.postNewUser(user);
    return;
}

async function validatePassword(password: string, cryptPassword: string) {
    const passwordIsValid = await bcrypt.compare(password, cryptPassword)
    if(!passwordIsValid) {
        throw credentialInvalid();
    }
}

async function createSession(userId: number) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET)
    await sessionRepository.createSession(token, userId)
    return token
}

async function findUserEmail(email: string) {
    const findEmail =  await userRepository.findUserByEmail(email)
    return findEmail
}


export const authService = {
    findUserEmail,
    createUser,
    validatePassword,
    createSession
} 