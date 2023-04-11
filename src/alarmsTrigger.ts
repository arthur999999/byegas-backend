import { alarms } from "@prisma/client";
import { alarmsRepositories } from "./repositories/alarms-repository";

async function verifyPrice(inGwei: boolean, chainId: number, price: number) {
    const alarm = await alarmsRepositories.getAlarmPrice( inGwei, chainId )
    alarm.forEach((m) => {
        
    })
}

function sendMenssage(m: alarms, price: number) {
    if(m.valueGas >= price) {
        
    }
}