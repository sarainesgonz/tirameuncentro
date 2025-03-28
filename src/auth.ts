import NextAuth from "next-auth"
import authConfig from "./auth.config"
//  importamos el prisma client y el prisma adapter para interactuar con BD y manejar persistencia de sesiones
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
 
// const prisma = new PrismaClient() //cresmos una sesion en la DB >> reemplazamos por el prisma que creamos en prisma.ts y lo pasamos al prisma adapter

// Exporta los manejadores, la instancia de autenticación (auth), y las funciones para iniciar y cerrar sesión (signIn, signOut)
// export const { handlers, auth, signIn, signOut } = NextAuth({ //
export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({ //exportamos los manejadores de get y post  
callbacks:{
  // async jwt({token}) {
  //   console.log({token});
  //   return token;
  async session({session, token}) {
    if (token.sub && session.user) {
      session.user.id = token.sub;
    }
    return session;

  }
},
  adapter: PrismaAdapter(prisma), //usael adapter de prisma con el prisma client que cree
  session: { strategy: "jwt" }, //config de la sesion con jwt
  ...authConfig, //cargam la config de autenticacion importada de auth.config.ts
})