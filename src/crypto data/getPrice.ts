import { chainsRepository } from "@/repositories";
import client from "@/util/redis";
import { chains, tokens } from "@prisma/client";
import axios from "axios";

export async function getData(){
    setInterval(async() => {
        try {
            const listChains = await chainsRepository.getOnlyChain()
            await gasApi(listChains)
            const listTokens = await chainsRepository.getAllToken()
            await tokenApi(listTokens)
        } catch (error) {
            console.log(error)
        }
        
    },10000)
    

}

async function gasApi(chain : chains[]) {
    chain.forEach(async(m) =>{
        try {
            const response = await axios.get(m.apiGas)
            client.set(`gas${m.name}`, JSON.stringify(response.data))
        } catch (error) {
            return
        }
        
    })
}

async function tokenApi(token: tokens[]){
    token.forEach(async(m) =>{
        try {
            const response = await axios.get(m.apiToken)
            client.set(`price${m.name}`, JSON.stringify(response.data))
        } catch (error) {
            return
        }
       
    })
}