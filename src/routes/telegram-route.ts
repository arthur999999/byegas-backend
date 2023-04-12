import { getUserTelegram, postTelegram } from "@/controllers/telegram-contoller";
import { validateToken } from "@/middlewares";
import { Router } from "express";

const telegramRoute = Router()

telegramRoute
    .all("/*",validateToken)
    .get("/", getUserTelegram)
    .post("/", postTelegram);

export default telegramRoute;