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