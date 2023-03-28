import { error } from "../../protocols";

export function invalidInfo(error: string): error {
    return {
        name: "invalidInfo",
        message: error
    }
}

export function noMatchPasswords(): error {
    return {
        name: "noMatchPasswords",
        message: "The confirm password is incorrect"
    }
}

export function emailExist(): error {
    return {
        name: "emailExist",
        message: "This email has been registered"
    }
}

export function emailNotFound(): error {
    return {
        name: "emailNotFound",
        message: "This email is not registered"
    }
}

export function credentialInvalid(): error {
    return {
        name: "credentialInvalid",
        message: "Password or email is invalid"
    }
}
