import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react'
import React from 'react'
import { RiLoginCircleLine } from 'react-icons/ri'

export default function LoginForm() {
    return (
        <Card className='mx-auto sm:w-2/3'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='flex flex-row items-center gap-3 font-semibold'>
                        <RiLoginCircleLine size={30} />
                        <h1 className='text-xl'>Iniciar sesión</h1>
                    </div>

                    <p className='text-neutral-700'>Ingresa a tu cuenta para empezar a chatear</p>

                </div>
            </CardHeader>

            <CardBody>
                <form action="">
                    <div className='space-y-4'>
                        <div className="flex flex-col items-center gap-4 px-4 md:px-8 lg:px-16">
                            <Input
                                label="Email"
                                type="email"
                                variant="underlined" />
                            <Input
                                label="Contraseña"
                                type="password"
                                variant="underlined" />
                            <Button fullWidth className="w-full md:w-3/4 m-4 bg-gradient-to-tr from-red-700 via-orange-600 to-yellow-500 text-white font-bold">
                                Iniciar sesión
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
