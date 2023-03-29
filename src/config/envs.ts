import dotenv from "dotenv";

export function loadEnvs() {
    let path = ".env"
    if(process.env.NODE_ENV === "test") {
        path = ".env.test"
    }
    if(process.env.NODE_ENV === "development") {
        path = "env.development"
    }

    dotenv.config({ path });
}