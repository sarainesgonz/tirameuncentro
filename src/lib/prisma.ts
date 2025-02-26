import { PrismaClient } from "@prisma/client";

// crea una instancia en la memoria global para guaradar la instancia de prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient };

//crea y exporta prisma para usarla en otros archivos, si existe PrismaClient la usa, si no la crea y configura para registrar las consultas SQL y ver que se esta ejecutando 
export const prisma = globalForPrisma.prisma || new PrismaClient({ log:["query"]}); 

// si estamos en desarrollo env, guardas la instancia prisma en memoria global para reutilizarla
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;