import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth-route/auth-route.js";

const app = express();

app.use(cors());
app.use(express.json());

app
    .get('/health', (req, res) => {
        res.send('OK');
    })
    .use('/auth', authRouter);

export default app;