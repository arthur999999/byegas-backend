import app, { init } from "@/app";
import { verifyPrices } from "./alarmsTrigger";
import bot from "./botTelegraf";

init().then(() => {
    app.listen(4000, () => {
        console.log("server on")
    })
    bot.launch()
    verifyPrices()
})

