import { postImage } from "../controllers";
import { validateBody, validateToken } from "../middlewares";
import { imageSchema } from "../schemas/imageSchema";
import { Router } from "express";

const imageRoute = Router()

imageRoute
    .all("/*",validateToken)
    .post("/", validateBody(imageSchema), postImage);

export default imageRoute;