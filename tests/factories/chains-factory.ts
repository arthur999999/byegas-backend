import { prisma } from "@/config/database"

export async function createChains() {
    const chainsEthereum = await prisma.chains.create({
        data:{
                name: "Ethereum",
                apiGas: "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=",
                image: "eth.png"
            }
    })

    const chainsPolygon = await prisma.chains.create({
        data:
        {
            name: "Polygon",
            apiGas: "https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=",
            image: "polygon.png"
        }
    })

    const chainsArbitrum = await prisma.chains.create({
        data: {
            name: "Arbitrum",
            apiGas: "https://api.arbiscan.io/api?module=proxy&action=eth_gasPrice&apikey=",
            image: "arbitrum.png"
        }
    })

    const tokens = await prisma.tokens.createMany({
        data: [
            {
                name: "ETH",
                apiToken: "https://api.coingecko.com/api/v3/coins/ethereum",
                chainId: chainsEthereum.id
            },
            {
                name: "MATIC",
                apiToken: "https://api.coingecko.com/api/v3/coins/matic-network",
                chainId: chainsPolygon.id
            },
            {
                name: "ARB",
                apiToken: "https://api.coingecko.com/api/v3/coins/arbitrum",
                chainId: chainsArbitrum.id
            }
        ]
    })

    return [chainsEthereum, chainsArbitrum, chainsPolygon]
}

export async function createFavoriteChain(userId: number, chainId: number) {
    return prisma.favorites.create({
        data: {
            userId: userId,
            chainId: chainId
        }
    })
}