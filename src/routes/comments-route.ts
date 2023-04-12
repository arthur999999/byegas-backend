import { createComment } from "@/controllers";
import { validateBody, validateToken } from "@/middlewares";
import { commentSchema } from "@/schemas/commentSchema";
import { Router } from "express";

const commentsRoute = Router()

commentsRoute
    .all("/*",validateToken)
    .post("/:chainId", validateBody(commentSchema) , createComment);

export default commentsRoute;