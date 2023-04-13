import app, { init } from "@/app"
import { faker } from "@faker-js/faker"
import supertest from "supertest"
import { createChains } from "../factories/chains-factory"
import { createUser } from "../factories/user-factory"
import { cleanDb, createValidToken } from "../helpers"

beforeAll(async () => {
    await init()
    await cleanDb()
})

beforeEach(async () => {
    await cleanDb()
})

const server = supertest(app)

describe("test POST /comments", () => {
    it("should be respond with 200", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();
        const body = {
            comment: faker.name.firstName()
        }

        const response = await server.post(`/comments/${chains[0].id}`).set("Authorization", `Bearer ${token}`).send(body)
        expect(response.status).toBe(200)
    })

    it("should be respond with 404 when chain not exist", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const body = {
            comment: faker.name.firstName()
        }

        const response = await server.post(`/comments/3`).set("Authorization", `Bearer ${token}`).send(body)
        expect(response.status).toBe(404)
    })
})