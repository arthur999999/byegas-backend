import { error } from "@/protocols";

export function invalidInfo(error: string): error {
    return {
        name: "invalidInfo",
        message: error
    }
}

export function notFoundError(message: string): error {
    return {
        name: "NotFoundError",
        message: message
    }
}
