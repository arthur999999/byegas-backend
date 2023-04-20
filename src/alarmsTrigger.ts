import { number } from "joi";
import { sendMenssage } from "./botTelegraf";
import { alarmsRepositories, telegramRepository } from "./repositories";
import { chainsService } from "./services";

export async function  verifyPrices() {
    let alarms: any = await alarmsRepositories.getListAlarms()
    if(!alarms[0]){
        alarms = [ 1 ]
    }
     setInterval(()=> {
        alarms.forEach(async(m, index) => {
            if(m !== 1){
                    try {
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
                            if(prices.dataStructured.Fast.usd <= m.valueGas / 10000){
                                await sendMenssage(Number(telegram.userTelegram),`Sound Alarm ${chain.name} gas = ${prices.dataStructured.Fast.usd.toFixed(6)} USD`, m.id)
                            }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                   
            }
            try {
                alarms = await alarmsRepositories.getListAlarms()
                if(!alarms[0]){
                        alarms = [ 1 ]
                }
            } catch (error) {
                console.log(error)
            }
            
        })
    }, 5000)
    
}