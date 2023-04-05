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

describe("test POST /chains/favorite/:chainId", () => {
    it("should response with 201", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();

        const response = await server.post(`/chains/favorite/${chains[0].id}`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(201);
    })

    it("should response with status 404 when chain not exist", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)

        const response = await server.post(`/chains/favorite/1`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(404);
    })

    it("should response with status 406 when chain has been favorite", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();
        const favorite = await createFavoriteChain(user.prismaReturn.id, chains[0].id);

        const response = await server.post(`/chains/favorite/${favorite.chainId}`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(406);
    })
})

describe("test DELETE /chains/favorite/:chainId", () => {
    it("should response with 200", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();
        const favorite = await createFavoriteChain(user.prismaReturn.id, chains[0].id);

        const response = await server.delete(`/chains/favorite/${favorite.chainId}`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200);
    })

    it("should response with 404 when favorite not exist", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();

        const response = await server.delete(`/chains/favorite/${chains[0].id}`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(404);
    })
})