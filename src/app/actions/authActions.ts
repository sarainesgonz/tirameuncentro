'use server';

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

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