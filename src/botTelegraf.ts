import { Telegraf } from "telegraf";
import { telegramService } from "./services";

const bot = new Telegraf(process.env.TOKEN_BOT)


bot.command('register', (ctx) => {
    const args = ctx.message.text.split(' ')
    console.log(args)
    if(!args[1]) {
        ctx.reply("This token is not valid")
        return
    }
    async function findTelegram () {
        try {
            const telegram = await telegramService.findTelegramByToken(args[1])
            if(!telegram){
                ctx.reply("This token is not valid")
                return
            }
            console.log(telegram)
            await telegramService.updateTelegram(String(ctx.chat.id), telegram.id)
            ctx.reply("Registered successfully")
        } catch (error) {
            ctx.reply("Error Error in registering")
        }
        
        
       
    }

    findTelegram()
    
    
    
})
  
export default bot
