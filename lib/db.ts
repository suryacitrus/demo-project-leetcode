import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
    prisma:PrismaClient | undefined
}

const pool = new Pool({
    connectionString:'postgresql://neondb_owner:npg_q2aPpK4Mcken@ep-silent-band-bdj93y5q-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter:adapter
})

if(process.env.NODE_ENV !=="production"){
    globalForPrisma.prisma = prisma;
}