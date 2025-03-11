// import GitHub from "next-auth/providers/github" //allow login using github as auth provider
import Credentials from "next-auth/providers/credentials" //allow login using email and password for the moment
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./lib/schemas/loginSchema"
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Credentials({
    name: "credentials",
    async authorize(creds) { //when we use the credentials provider, we need to implement the authorize method it has available
      const validated = loginSchema.safeParse(creds);

      if (validated.success) {
        const {email, password} = validated.data;
        // check the credentials against your database
        const user = await getUserByEmail(email);

        if (!user || !(await compare(password, user.passwordHash))) { //compare function comes from bcryptjs, allows comparison between normal password and hasshed passeword
          return null;
        }

        return user;
      }

      // if not authorized or logged in
      return null;
    }
  })],
} satisfies NextAuthConfig //cumplir con la estructura que espera NextAuthConfig