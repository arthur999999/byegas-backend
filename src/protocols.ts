import { users } from "@prisma/client";

export type error = {
    name: string,
    message: string
};

export type newUser = Omit< users, "id" | "createdAt" >