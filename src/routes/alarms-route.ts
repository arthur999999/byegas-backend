import { listAlarms, postAlarm } from "@/controllers";
import { validateBody, validateToken } from "@/middlewares";
import { alarmSchema } from "@/schemas/alarmSchema";
import { Router } from "express";

const alarmsRoute = Router()

alarmsRoute
    .all("/*",validateToken)
    .get("/list", listAlarms)
    .post("/:chainId", validateBody(alarmSchema), postAlarm);

export default alarmsRoute;