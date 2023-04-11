import express from "express";
import cors from "cors";
import { authRouter, chainRouter  } from "@/routes";
import { connectDb, disconnectDB } from "./config/database";
import alarmsRoute from "./routes/alarms-route";

const app = express();

app.use(cors());
app.use(express.json());

app
    .get('/health', (req, res) => {
        res.send('OK');
    })
    .use('/auth', authRouter)
    .use('/chains', chainRouter)
    .use('/alarms', alarmsRoute);

export function init() {
    connectDb();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
    await disconnectDB();
}
export default app;