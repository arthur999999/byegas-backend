import app, { init } from "../../src/app"
import { cleanDb } from "../helpers"
import supertest from "supertest"
import { createRegister, createUser } from "../factories/user-factory"

beforeAll(async () => {
    await init()
    await cleanDb()
})

const server = supertest(app);

describe("Test login user", () => {
    
    it("Should respond with 422 when invalid body", async () => {
        const response = await server.post('/auth/sign-in').send({})

        expect(response.status).toBe(422)
    })
    it("Should respond with 404 when not regitered email", async () => {
        const body = {email: "noRegistered@gmail.com", password: "password"}
        const response = await server.post('/auth/sign-in').send(body)

        expect(response.status).toBe(404)
    })
    it("Should respond with 200 and token", async () => {
        const user = await createUser();
        const body = { email: user.prismaReturn.email, password: user.password}
        const response = await server.post('/auth/sign-in').send(body)
        expect(response.status).toBe(200)
       
    })
    it("Should respond with 400 when password is wrong", async () => {
        const user = await createUser();
        const body = { email:  user.prismaReturn.email, password: "a"}
        const response = await server.post('/auth/sign-in').send(body)
        expect(response.status).toBe(400)
       
    })
})

describe("Test register user", () => {
    beforeAll(async () => {
        await init()
        await cleanDb()
    })

    it("Should respond with 422 when body is not valid", async () => {
        const response = await server.post('/auth/sign-up').send({})
        expect(response.status).toBe(422)
    })

    it("Should respond with 200 when body is valid", async () => {
        const body = createRegister();
        const response = await server.post('/auth/sign-up').send(body)
        expect(response.status).toBe(200)
    })
})