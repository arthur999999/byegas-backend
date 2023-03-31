import app, { init } from "../../src/app"
import { cleanDb, createValidToken } from "../helpers"
import supertest from "supertest"
import { createUser } from "../factories/user-factory"
import { createChains } from "../factories/chains-factory"

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
    })

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