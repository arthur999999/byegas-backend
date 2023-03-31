import { chainsService } from "@/services"
import { chains, favorites, tokens } from "@prisma/client"


describe("test get API data and structured", () => {
    it("should response with structured data", async () => {
        const list: (chains & { tokens: tokens[]; favorites: favorites[] })[] = 
            [
                {
                  id: 4,
                  name: "Ethereum",
                  apiGas: "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=",
                  image: "eth.png",
                  createdAt:new Date() ,
                  updatedAt:new Date() ,
                  tokens: [
                    {
                      id: 1,
                      name: "ETH",
                      apiToken: "https://api.coingecko.com/api/v3/coins/ethereum",
                      chainId: 4,
                      createdAt:new Date() ,
                      updatedAt:new Date() 
                    }
                  ],
                  favorites: [
                    {
                      id: 6,
                      userId: 42,
                      chainId: 4,
                      createdAt:new Date() ,
                      updatedAt:new Date() 
                    }
                  ]
                },
                {
                  id: 5,
                  name: "Polygon",
                  apiGas: "https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=",
                  image: "polygon.png",
                  createdAt:new Date() ,
                  updatedAt:new Date() ,
                  tokens: [
                    {
                      id: 2,
                      name: "MATIC",
                      apiToken: "https://api.coingecko.com/api/v3/coins/matic-network",
                      chainId: 5,
                      createdAt:new Date() ,
                      updatedAt:new Date() 
                    }
                  ],
                  favorites: [
                    {
                      id: 8,
                      userId: 42,
                      chainId: 5,
                      createdAt:new Date() ,
                      updatedAt:new Date() 
                    }
                  ]
                },
                {
                  id: 6,
                  name: "Arbitrum",
                  apiGas: "https://api.arbiscan.io/api?module=proxy&action=eth_gasPrice&apikey=",
                  image: "arbitrum.png",
                  createdAt:new Date() ,
                  updatedAt: new Date(), 
                  tokens: [
                    {
                      id: 3,
                      name: "ARB",
                      apiToken: "https://api.coingecko.com/api/v3/coins/arbitrum",
                      chainId: 6,
                      createdAt:new Date() ,
                      updatedAt:new Date() 
                    }
                  ],
                  favorites: []
                }
            ]

        const response = await chainsService.getGasPrice(list)
        expect(response).toEqual(expect.arrayContaining([
            
                {
                    name: expect.any(String),
                    dataStructured: {
                      gwei: expect.any(Number),
                      usd: expect.any(Number)
                    },
                    favorite: expect.any(Boolean),
                    image: expect.any(String),
                    id: expect.any(Number)
                }
            
        ])

        )
    }) 
   


})