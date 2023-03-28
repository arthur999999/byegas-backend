import { credentialInvalid, emailExist, emailNotFound, invalidInfo, noMatchPasswords } from "./error.js";
import { signinSchema, signupSchema } from "../../schemas/authSchema.js";
import { authRepository } from "../../repositories/auth-repository/auth-repository.js";
import { newUser } from "../../protocols.js";
import bcrypt from "bcrypt";


async function createUser(newUser) {
    const user: newUser = {
        name: newUser.name,
        email: newUser.email,
        password: bcrypt.hashSync(newUser.password, 10),
        updatedAt: new Date()
    }
    await authRepository.postNewUser(user);
    return;
}

async function validatePassword(password: string, cryptPassword: string) {
    const passwordIsValid = await bcrypt.compare(password, cryptPassword)
    if(!passwordIsValid) {
        throw credentialInvalid();
    }
}

async function findUserEmail(email: string) {
    const findEmail =  await authRepository.findUserByEmail(email)
    return findEmail
}


export const authService = {
    findUserEmail,
    createUser,
    validatePassword
} 