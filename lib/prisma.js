import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../../lib/generated/prisma";
// import "@prisma/xxx-client"

export const db=globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV!== "production"){
    globalThis.prisma=db;
}

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global;

// export const db =
//   globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = db;
// }

