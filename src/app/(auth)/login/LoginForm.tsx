'use client';

import { signInUser } from '@/app/actions/authActions';
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema';
import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import { RiLoginCircleLine } from 'react-icons/ri'

export default function LoginForm() {

    const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema), //le digo usá este schema de zod para decidir si los datos son válidos o nos
        mode: 'onTouched' //validar el formulario cuando el usuario deja de escribir
    });

    const router = useRouter();

    //ya sabemos que el tipo de data que estamos utilizando es LoginSchema
    const onSubmit = async (data: LoginSchema) => { 
        const result = await signInUser(data);

        if (result.status === "success") {
            router.push("/users")
        } else {
            console.error(result.error);
        }
    }

    return (
        <Card className='mx-auto sm:w-2/3'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='flex flex-row items-center gap-3 font-semibold'>
                        <RiLoginCircleLine size={30} />
                        <h1 className='text-xl'>Inicio de sesión</h1>
                    </div>

                    <p className='text-neutral-700'>Ingresa a tu cuenta para empezar a chatear</p>

                </div>
            </CardHeader>

            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <div className="flex flex-col items-center gap-4 px-4 md:px-8 lg:px-16">
                            <Input
                                defaultValue=''
                                label="Email"
                                type="email"
                                variant="underlined" 
                                {...register("email")}
                                isInvalid={!!errors.email} //doble !! para convertir object a boolean
                                errorMessage={errors.email?.message as string}
                                />
                            <Input
                                defaultValue=''
                                label="Contraseña"
                                type="password"
                                variant="underlined" 
                                {...register("password")}
                                isInvalid={!!errors.password} //doble !! para convertir object a boolean
                                errorMessage={errors.password?.message as string}
                                />
                            <Button 
                                isLoading={isSubmitting}
                                fullWidth type='submit' className="w-full md:w-3/4 m-4 bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white font-bold">
                                Iniciar sesión
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
