import NextAuth from "next-auth"
import authConfig from "./auth.config"
//  importamos el prisma client y el prisma adapter para interactuar con BD y manejar persistencia de sesiones
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
 
const prisma = new PrismaClient()
 
// Exporta los manejadores, la instancia de autenticación (auth), y las funciones para iniciar y cerrar sesión (signIn, signOut)
export const { handlers, auth, signIn, signOut } = NextAuth({ //
  adapter: PrismaAdapter(prisma), //usael adapter de prisma con el prisma client que cree
  session: { strategy: "jwt" }, //config de la sesion con jwt
  ...authConfig, //cargam la config de autenticacion i,´prtada de auth.config.ts
})