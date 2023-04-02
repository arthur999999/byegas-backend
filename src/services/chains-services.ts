import { notFoundError } from "@/erros";
import { chainsRepository } from "@/repositories";
import { chains, favorites, tokens } from "@prisma/client";
import axios from "axios";

async function getAllChainsWithTokens(userId) {
    const listChains = await chainsRepository.getAllChainsAndTokens(userId)
    if(!listChains[0]) {
        throw notFoundError("Not found chains");
    }
    return listChains
}

async function getFavorites(userId: number) {
    const list = await chainsRepository.getFavoriteChains(userId)
    const realList = []
    if(!list[0]) {
        throw notFoundError("Not found chains");
    }
    list.forEach((m) => {
        realList.push(m.chains);
    })
    return realList
}

async function getAChain(chainId: number, userId: number) {
    const chain = await chainsRepository.getChain(chainId, userId)
    if(!chain) {
        throw notFoundError("Not found chains");
    }
    return chain
}

async function getGasPrice(list: (chains & { tokens: tokens[]; favorites: favorites[] })[]) {
    const gasPriceList = []
    for(let i = 0; list.length > i ; i++) {
      const chain = await getGasAndPriceToken(list[i], true)
      gasPriceList.push(chain)
    }

    return gasPriceList
}

async function gasGetApi(link: string){
    const response = await axios.get(`${link}`)
    return response.data
}

async function getGasAndPriceToken(chain, isList: boolean){
    const dataGas = await gasGetApi(chain.apiGas)
    let priceToken
    if(chain.name !== "Polygon" && chain.name !== "Arbitrum") {
        const resp = await tokenPrice(chain.tokens[0].apiToken);
        priceToken = resp.market_data.current_price.usd
    }else if(chain.name === "Arbitrum"){
        const resp = await tokenPrice("https://api.coingecko.com/api/v3/coins/ethereum");
        priceToken = resp.market_data.current_price.usd
    }else{
        priceToken = dataGas.result.UsdPrice
    }
    const data = {
        dataGas, priceToken
    }

    const dataStructured = structureData(data, chain.name, isList)
    
    if(isList) {
        return({ name: chain.name, dataStructured, favorite: chain.favorites[0] ? true : false , image: chain.image, id: chain.id})
    }

    return({ name: chain.name, dataStructured, favorite: chain.favorites[0] ? true : false , image: chain.image, id: chain.id, comments: chain.comments, alarm: chain.alarms})
}

async function tokenPrice(link: string) {
    const response = await axios.get(`${link}`)
    return response.data
}

export function structureData(data, name: string, isList: boolean){
    if( name === "Arbitrum") {
        const hexData = parseInt(data.dataGas.result.split('x')[1], 16)
        if(!isList) {
            return {
                Standart: {
                    gwei: hexData/1000000000 * 21000,
                    usd: ((hexData/1000000000)/1000000000) * data.priceToken * 21000
                },
                Fast: {
                    gwei: hexData/1000000000 * 21000,
                    usd: ((hexData/1000000000)/1000000000) * data.priceToken * 21000
                },
                Rapid: {
                    gwei: hexData/1000000000 * 21000,
                    usd: ((hexData/1000000000)/1000000000) * data.priceToken * 21000
                }
            }
        }
        return {
            gwei: hexData/1000000000 * 21000,
            usd: ((hexData/1000000000)/1000000000) * data.priceToken * 21000
        }
    }
    if(!isList){
        return {
            Standart: {
                gwei: data.dataGas.result.SafeGasPrice * 21000,
                usd: ((data.dataGas.result.SafeGasPrice * 21000) / 1000000000) * data.priceToken
            },
            Fast: {
                gwei: data.dataGas.result.ProposeGasPrice * 21000,
                usd: ((data.dataGas.result.ProposeGasPrice * 21000) / 1000000000) * data.priceToken
            },
            Rapid: {
                gwei: data.dataGas.result.FastGasPrice * 21000,
                usd: ((data.dataGas.result.FastGasPrice * 21000) / 1000000000) * data.priceToken
            }
        }
    }
    return {
        gwei: data.dataGas.result.FastGasPrice * 21000,
        usd: ((data.dataGas.result.FastGasPrice * 21000) / 1000000000) * data.priceToken  
    }
}

function organizeInCrescentSequence(list) {
    const organizedList = []
    const repit = list.length
    while(organizedList.length < repit) {
        let smaller = Number.POSITIVE_INFINITY
        let smallerObject
        for(let i = 0; list.length > i ; i++) {
            if(list[i].dataStructured.usd < smaller) {
                smallerObject = i
                smaller = list[i].dataStructured.usd
            }
        }
        organizedList.push(list[smallerObject])
        list.splice(smallerObject, 1)    
    }
    return organizedList
}

export const chainsService = {
    getAllChainsWithTokens,
    getGasPrice,
    organizeInCrescentSequence,
    getAChain,
    getGasAndPriceToken,
    getFavorites
}