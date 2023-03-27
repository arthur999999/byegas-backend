import { emailExist, invalidInfo, noMatchPasswords } from "./error.js";
import { signupSchema } from "../../schemas/registerSchema.js";
import { authRepository } from "../../repositories/auth-repository/auth-repository.js";
import { newUser } from "../../protocols.js";
import bcrypt from "bcrypt";

export async function registerNewUser(newUser) {
    const validateUser = signupSchema.validate(newUser, {abortEarly: false});
    if(validateUser.error){
        throw invalidInfo(validateUser.error.message);
    }
    if(newUser.password !== newUser.confirmPassword) {
        throw noMatchPasswords();
    }

    const findEmail = await authRepository.findUserByEmail(newUser.email)
    if(findEmail){
        throw emailExist();
    }

    const user: newUser = {
        name: newUser.name,
        email: newUser.email,
        password: bcrypt.hashSync(newUser.password, 10),
        updatedAt: new Date()
    }
    
    const result = await authRepository.postNewUser(user);
    return result;
}

export const authService = {
    registerNewUser
} 