import app, { init } from "./app";
import { verifyPrices } from "./alarmsTrigger";
import bot from "./botTelegraf";
import { getData } from "./crypto data/getPrice";

init().then(() => {
    const port = process.env.SERVER_PORT
    app.listen(port, () => {
        console.log("server on")
    })
    bot.launch()
    getData()
    verifyPrices()
})

