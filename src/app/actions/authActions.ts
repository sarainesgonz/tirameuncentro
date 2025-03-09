'use server';

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterSchema) {
    // we can also use zod on the server side to validate the data fron the form
    const validatedData = registerSchema.safeParse(data);

    if (!validatedData.success) {
        return {
            error: validatedData.error.errors
        }
    }

    const { name, email, password} = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return {
            error: "Este email ya está registrado."
        }
    };

// if I put the function below in a variable, then I need the await, but as I'm returning the function here, not needed to put await after the return
    return prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword
        }
    })
};