import app, { init } from "@/app";
import bot from "./botTelegraf";

init().then(() => {
    app.listen(4000, () => {
        console.log("server on")
    })
    bot.launch()
})
