import { loginUser, registerUser } from "../../controllers/auth-controller/auth-controller";
import { Router } from "express";
import { validateBody } from "../../middlewares/validateBody";
import { signinSchema, signupSchema } from "../../schemas/authSchema";

const authRouter = Router();

authRouter
    .post('/sign-up', validateBody(signupSchema), registerUser)
    .post('/sign-in', validateBody(signinSchema), loginUser);
export { authRouter };