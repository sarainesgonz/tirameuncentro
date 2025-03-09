'use client';

import { registerUser } from '@/app/actions/authActions';
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
import { Card, CardHeader, CardBody, Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { LuUserPen } from 'react-icons/lu';
import { set } from 'zod';


export default function RegisterForm() {
    const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting } } = useForm<RegisterSchema>({
        // resolver: zodResolver(registerSchema), //le digo usá este schema de zod para decidir si los datos son válidos o nos
        mode: 'onTouched' //validar el formulario cuando el usuario deja de escribir
    });

    //ya sabemos que el tipo de data que estamos utilizando es LoginSchema
    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);

        if (result.status === "success") {
            console.log("Usuario registrado exitosamente.", result.data);
        } else {
            // si contiene un array de errores, entonces iteramos sobre cada uno de ellos 
            if (Array.isArray(result.error)) {
                // console.log("Error al registrar usuario", result.error);
                result.error.forEach((e) => {
                    const fieldName = e.path.join('.') as "name" | "email" | "password";
                    // setError permite manejar errores manualmente segun la respuesta del servidor
                    setError(fieldName, { message: e.message });
                });
            } else {
                setError("root.serverError", { message: result.error }); //error can be stored in the root
            }
        }
    }

    return (
        <Card className='mx-auto sm:w-2/3'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='flex flex-row items-center gap-3 font-semibold'>
                        <LuUserPen size={30} />
                        <h1 className='text-xl'>Registro</h1>
                    </div>

                    <p className='text-neutral-700'>Registrate para empezar a conocer gente</p>

                </div>
            </CardHeader>

            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <div className="flex flex-col items-center gap-4 px-4 md:px-8 lg:px-16">
                            <Input
                                defaultValue=''
                                label="Nombre"
                                type="name"
                                variant="underlined"
                                {...register("name")}
                                isInvalid={!!errors.name} //doble !! para convertir object a boolean
                                errorMessage={errors.name?.message}
                            />
                            <Input
                                defaultValue=''
                                label="Email"
                                type="email"
                                variant="underlined"
                                {...register("email")}
                                isInvalid={!!errors.email} //doble !! para convertir object a boolean
                                errorMessage={errors.email?.message}
                            />
                            <Input
                                defaultValue=''
                                label="Contraseña"
                                type="password"
                                variant="underlined"
                                {...register("password")}
                                isInvalid={!!errors.password} //doble !! para convertir object a boolean
                                errorMessage={errors.password?.message}
                            />
                            {/* check if we have errors */}
                            {errors.root?.serverError && (
                                <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                            )}
                            <Button
                                isLoading={isSubmitting}
                                fullWidth type='submit' className="w-full md:w-3/4 m-4 bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white font-bold">
                                Registrarse
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

