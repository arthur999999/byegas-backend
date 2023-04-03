import app, { init } from "../../src/app"
import { cleanDb, createValidToken } from "../helpers"
import supertest from "supertest"
import { createUser } from "../factories/user-factory"
import { createChains, createFavoriteChain } from "../factories/chains-factory"

beforeAll(async () => {
    await init()
    await cleanDb()
})

beforeEach(async () => {
    await cleanDb()
})

const server = supertest(app)

describe("test GET all chains", () => {
    it("Respond with status 200 and data", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        await createChains();

        const response = await server.get('/chains/list/all').set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                dataStructured: {
                gwei: expect.any(Number),
                usd: expect.any(Number)
                },
                favorite: expect.any(Boolean),
                image: expect.any(String),
                id: expect.any(Number)
            })
        ]))
    }, 30000)

    it("respond with status 401 when token is not valid", async () => {
        const token = "1"
        const response = await server.get('/chains/list/all').set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(401);
    })

    it("respond with status 404 when not exist chains", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const response = await server.get('/chains/list/all').set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(404);
    })
})

describe("test GET specific chain data", () => {
    it("should response with 200 with data", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();

        const response = await server.get(`/chains/listone/${chains[0].id}`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200);

        expect(response.body).toEqual(expect.objectContaining({
            name: chains[0].name,
            dataStructured: {
                Standart: {
                gwei: expect.any(Number),
                usd: expect.any(Number)
                },
                Fast: {
                gwei: expect.any(Number),
                usd: expect.any(Number)
                },
                Rapid: {
                gwei: expect.any(Number),
                usd: expect.any(Number)
                }
            },
            favorite: expect.any(Boolean),
            image: expect.any(String),
            id: chains[0].id,
            comments: expect.any(Array),
            alarm: expect.any(Array)
        }))
    }, 20000)

    it("should response with 404 when chain not exist", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const response = await server.get(`/chains/listone/1`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(404)
    })

    it("should response with 401 when token is not valid", async () => {
        const user = await createUser()
        const token = "none"
        const response = await server.get(`/chains/listone/1`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(401)
    })
})

describe("test GET favorites chains", () => {
    it("should response with 200 and data", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();
        await createFavoriteChain(user.prismaReturn.id, chains[0].id)

        const response = await server.get(`/chains/favorites`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)

        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                dataStructured: {
                gwei: expect.any(Number),
                usd: expect.any(Number)
                },
                favorite: expect.any(Boolean),
                image: expect.any(String),
                id: expect.any(Number)
            })
        ]))
    }, 30000)

    it("should response with 404 when not exist favorites", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();

        const response = await server.get(`/chains/favorites`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(404)

    })
})