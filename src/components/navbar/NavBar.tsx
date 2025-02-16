import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { GiSoccerBall, GiFireball, GiThreeBurningBalls } from 'react-icons/gi'
import NavLink from './NavLink'

export default function Nav() {
    return (
        <Navbar
            maxWidth='xl'
            // className='bg-gradient-to-r from-pink-700 to-pink-900'
            className='bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500'
            classNames={{ //customize specific parts of the navbar component
                item: [
                    'text-white',
                    'text-xl',
                    'data-[active=true]:border-b-2 border-white'
                ]
            }}>
            <NavbarBrand as={Link} href='/'>
                <GiSoccerBall size={45} color='white' />
                <div className='font-bold text-2xl text-white'>
                    <span className='font-normal'>Tirame un </span>
                    <span className='font-bold'>centro!</span>
                </div>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavLink href='/users' label='Enganches' />
                <NavLink href='/lists' label='Tribuna' />
                <NavLink href='/messages' label='Mensajes' />
            </NavbarContent>
            <NavbarContent justify='end'>
                <Button as={Link} href='/login' variant='light' className='text-white'>Iniciar sesión</Button>
                <Button as={Link} href='/register' variant='light' className='text-white'>Registrarse</Button>
            </NavbarContent>
        </Navbar>
    )
}
