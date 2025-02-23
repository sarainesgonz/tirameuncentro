'use client';

import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
import { Card, CardHeader, CardBody, Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { LuUserPen } from 'react-icons/lu';

export default function RegisterForm() {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema), //le digo usá este schema de zod para decidir si los datos son válidos o nos
        mode: 'onTouched' //validar el formulario cuando el usuario deja de escribir
    });

    //ya sabemos que el tipo de data que estamos utilizando es LoginSchema
    const onSubmit = (data: RegisterSchema) => { 
        console.log(data) //get data from form
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
                            <Button fullWidth type='submit' className="w-full md:w-3/4 m-4 bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white font-bold">
                                Registrarse
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}


