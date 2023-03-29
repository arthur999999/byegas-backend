import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient

async function main() {
    const chains = await prisma.chains.createMany({
        data:[
            {
                name: "Ethereum",
                apiGas: "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=",
                image: "eth.png"
            },
            {
                name: "Polygon",
                apiGas: "https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=",
                image: "polygon.png"
            },
            {
                name: "Arbitrum",
                apiGas: "https://api.arbiscan.io/api?module=proxy&action=eth_gasPrice&apikey=",
                image: "arbitrum.png"
            }
        ]
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });