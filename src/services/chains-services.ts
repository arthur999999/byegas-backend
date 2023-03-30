import { chainsRepository } from "@/repositories";
import { chains, favorites, tokens } from "@prisma/client";
import axios from "axios";

async function getAllChainsWithTokens(userId) {
    const listChains = await chainsRepository.getAllChainsAndTokens(userId)
    return listChains
}

async function getGasPrice(list: (chains & { tokens: tokens[]; favorites: favorites[] })[]) {
    const gasPriceList = []
    for(let i = 0; list.length > i ; i++) {
        const dataGas = await gasGetApi(list[i].apiGas)
        let priceToken
        if(list[i].name !== "Polygon" && list[i].name !== "Arbitrum") {
            const resp = await tokenPrice(list[i].tokens[0].apiToken);
            priceToken = resp.market_data.current_price.usd
        }else if(list[i].name === "Arbitrum"){
            const resp = await tokenPrice("https://api.coingecko.com/api/v3/coins/ethereum");
            priceToken = resp.market_data.current_price.usd
        }else{
            priceToken = dataGas.result.UsdPrice
        }
        const data = {
            dataGas, priceToken
        }

        const dataStructured = structureData(data, list[i].name)
        
        gasPriceList.push({ name: list[i].name, dataStructured, favorite: list[i].favorites[0] ? true : false })
    }

    return gasPriceList
}

async function gasGetApi(link: string){
    const response = await axios.get(`${link}`)
    return response.data
}

async function tokenPrice(link: string) {
    const response = await axios.get(`${link}`)
    return response.data
}

function structureData(data, name: string){
    if( name === "Arbitrum") {
        const hexData = parseInt(data.dataGas.result.split('x')[1], 16)
        return {
            gwei: hexData/1000000000 * 21000,
            usd: ((hexData/1000000000)/1000000000) * data.priceToken * 21000
        }
    }
    return {
        gwei: data.dataGas.result.FastGasPrice * 21000,
        usd: ((data.dataGas.result.FastGasPrice * 21000) / 1000000000) * data.priceToken  
    }
}

export const chainsService = {
    getAllChainsWithTokens,
    getGasPrice
}