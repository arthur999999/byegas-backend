import { error } from "@/protocols";

export function invalidInfo(error: string): error {
    return {
        name: "invalidInfo",
        message: error
    }
}
