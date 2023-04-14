import { sendMenssage } from "./botTelegraf";
import { alarmsRepositories, telegramRepository } from "./repositories";
import { chainsService } from "./services";

export async function  verifyPrices() {
    const alarms = await alarmsRepositories.getListAlarms()
    alarms.forEach((m, index) => {
        setTimeout(async() => {
            const telegram = await telegramRepository.getTelegramByUserId(m.userId)
            if(!telegram || telegram.userTelegram.length == 6){
                return
            }
            const chain = await chainsService.getAChain(m.chainId, m.userId)
            const prices = await chainsService.getGasAndPriceToken(chain, false)
            
            if(m.inGwei){
                if(prices.dataStructured.Fast.gwei / 10000 <= m.valueGas){
                    
                    await sendMenssage(Number(telegram.userTelegram), `Sound Alarm ${chain.name} gas = ${prices.dataStructured.Fast.gwei} Gwei`, m.id)
                }
            }else{
                if(prices.dataStructured.Fast.usd <= m.valueGas){
                    await sendMenssage(Number(telegram.userTelegram),`Sound Alarm ${chain.name} gas = ${prices.dataStructured.Fast.usd.toFixed(6)} USD`, m.id)
                }
            }
        }, index*5000)
        
    })
}