import { registerUser } from "../../controllers/auth-controller/auth-controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', registerUser);

export { authRouter };