import { chainsRepository } from "@/repositories";
import { chains, tokens } from "@prisma/client";
import axios from "axios";

async function getAllChainsWithTokens() {
    const listChains = await chainsRepository.getAllChainsAndTokens()
    return listChains
}

async function getGasPrice(list: (chains & { tokens: tokens[] })[]) {
    const gasPriceList = []
    for(let i = 0; list.length > i ; i++) {
        const data = await gasGetApi(list[i].apiGas)
        gasPriceList.push({ name: list[i].name, data})
    }

    return gasPriceList
}

async function gasGetApi(link){
    const response = await axios.get(`${link}`)
    return response.data
}

export const chainsService = {
    getAllChainsWithTokens,
    getGasPrice
}