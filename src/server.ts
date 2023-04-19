import app, { init } from "@/app";
import { verifyPrices } from "./alarmsTrigger";
import bot from "./botTelegraf";
import { getData } from "./crypto data/getPrice";

init().then(() => {
    app.listen(4000, () => {
        console.log("server on")
    })
    bot.launch()
    getData()
    verifyPrices()
})

