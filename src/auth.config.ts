import GitHub from "next-auth/providers/github" //allow login using github as auth provider
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub],
} satisfies NextAuthConfig //cumplir con la estructura que espera NextAuthConfig