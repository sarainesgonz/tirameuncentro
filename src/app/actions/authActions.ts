'use server';

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> { //this method returns a promise of type ActionResult<User>
    try {
        // we can also use zod on the server side to validate the data fron the form
        const validatedData = registerSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                status: "error", 
                error: validatedData.error.errors
            }
        }

        const { name, email, password } = validatedData.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return {
                status: "error",
                error: "Este email ya está registrado."
            }
        };

       const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword
            }
        })

        return {
            status: "success",
            data: user
        }

    } catch (error) {
        console.error(error);
        return {
            status: "error",
            error: "Error al registrar usuario"
        }
    }

};


export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {email: email}});
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {id: id}});
}

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {

    try {
        const result = await signIn( // first argument is the provider name, second is the credentials object
            "credentials",
            {
                email: data.email,
                password: data.password,
                redirect: false
            }
        )
        console.log(result);

        return {
            status: "success",
            data: "Sesión iniciada."
        }

    } catch (error) {
        console.log(error);
        if(error instanceof AuthError) { //AuthError is a class from next-auth and provides error types 
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        status: "error",
                        error: "Credenciales inválidas."
                    };
            
                default:
                    return {
                        status: "error",
                        error: "Error al iniciar sesión."
                    };
            };
        } else {
            return {
                status: "error",
                error: "Error al iniciar sesión."
            };
        };
    };
}

export async function signOutUser() {
    await signOut({redirectTo: "/"});
}