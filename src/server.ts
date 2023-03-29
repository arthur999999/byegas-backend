import app, { init } from "@/app";

init().then(() => {
    app.listen(4000, () => {
        console.log("server on")
    })
})
