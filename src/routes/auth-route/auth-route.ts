import { loginUser, registerUser } from "../../controllers/auth-controller/auth-controller.js";
import { Router } from "express";
import { validateBody } from "../../middlewares/validateBody.js";
import { signinSchema, signupSchema } from "../../schemas/authSchema.js";

const authRouter = Router();

authRouter
    .post('/sign-up', validateBody(signupSchema), registerUser)
    .post('/sign-in', validateBody(signinSchema), loginUser);
export { authRouter };