import {z} from 'zod';

// create a zod schema for the register form with the structure and validation rules
export const registerSchema = z.object({
// the fields we are going to validate
    name: z.string().min(3, {
        "message": "El nombre debe tener al menos 3 caracteres."
    }), 
    email: z.string().email({
        "message": "Ingresa un email válido."
    }), //must have valid email format
    password: z.string().min(8, {
        "message": "La contraseña debe tener al menos 8 caracteres."
    }) //password must be at least 8 characters long
})

// le decimos los typos de valores que esperamos recibir
export type RegisterSchema = z.infer<typeof registerSchema> 