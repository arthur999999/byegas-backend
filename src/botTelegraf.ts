import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TOKEN_BOT)

bot.on('text', (ctx) => {
    // Obter o texto da mensagem
    const messageText = ctx.message.text
    console.log(messageText)
  
    // Responder ao usuário
    ctx.reply(`Você disse: ${messageText}`)
  })
  
export default bot
