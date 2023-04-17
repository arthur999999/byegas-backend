import app, { init } from "../../src/app"
import { cleanDb, createValidToken } from "../helpers"
import supertest from "supertest"
import { createRegister, createUser } from "../factories/user-factory"
import { createChains } from "../factories/chains-factory"
import { createAlarm } from "../factories/alarms-factory"
import { faker } from "@faker-js/faker"

beforeAll(async () => {
    await init()
    await cleanDb()
})

beforeEach(async () => {
    await cleanDb()
})

const server = supertest(app);

describe("test GET all alarms", () => {
    it("should response with 200 and data", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();
        await createAlarm(user.prismaReturn.id, chains[0].id, faker.datatype.boolean(), faker.datatype.number())

        const response = await server.get("/alarms/list").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                userId: expect.any(Number),
                chainId: expect.any(Number),
                valueGas: expect.any(Number),
                inGwei: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                chains: {
                  id: expect.any(Number),
                  name: expect.any(String),
                  apiGas: expect.any(String),
                  image: expect.any(String),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String)
                }
            })
        ]))
    })

    it("should response with 404 when alarms no exist", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();

        const response = await server.get("/alarms/list").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)
    })
})

describe("test POST alarms", () => {
    it("should response with 201 when create a new alarm", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();
        const body = {
            id: faker.datatype.number(),
            valueGas: faker.datatype.number(),
            inGwei: faker.datatype.boolean()
        }

        const response = await server.post(`/alarms/${chains[0].id}`).set("Authorization", `Bearer ${token}`).send(body)
        expect(response.status).toBe(201)
    })

    it("should response with 201 and update a alarm", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const chains = await createChains();
        const alarm = await createAlarm(user.prismaReturn.id, chains[0].id, faker.datatype.boolean(), faker.datatype.number())

        const body = {
            id: alarm.id,
            valueGas: faker.datatype.number(),
            inGwei: faker.datatype.boolean()
        }

        const response = await server.post(`/alarms/${chains[0].id}`).set("Authorization", `Bearer ${token}`).send(body)
        expect(response.status).toBe(201)
    })

    it("should be response with 404 and chain not exist", async () => {
        const user = await createUser()
        const token = await createValidToken(user.prismaReturn.id)
        const body = {
            id: faker.datatype.number(),
            valueGas: faker.datatype.number(),
            inGwei: faker.datatype.boolean()
        }

        const response = await server.post(`/alarms/1`).set("Authorization", `Bearer ${token}`).send(body)
        expect(response.status).toBe(404)
    })
})