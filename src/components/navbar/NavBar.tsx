'use client'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { GiSoccerBall } from 'react-icons/gi'
import NavLink from './NavLink'
import { auth } from '@/auth'
import { useSession } from '../Providers'
import UserMenu from './UserMenu'

export default function Nav() {

    const session = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: 'Enganches', href: '/users' },
        { label: 'Tribuna', href: '/lists' },
        { label: 'Mensajes', href: '/messages' },
        { label: 'Iniciar Sesión', href: '/login' },
        { label: 'Registrarse', href: '/register' },
    ]

    const filteredMenuItems = session?.user
        ? menuItems.slice(0, 3) // si loggeado, muestro primeros 3
        : menuItems.slice(-2);

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            maxWidth='xl'
            // className='bg-gradient-to-r from-pink-700 to-pink-900'
            className='bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500 sticky top-0'
            classNames={{ //customize specific parts of the navbar component
                item: [
                    'sm:text-white', //On screens 640px and larger the text color will be white, ignored for smaller screens
                    'text-xl',
                    'data-[active=true]:border-b-2 border-white'
                ]

            }}>
            <NavbarContent>

                {/* burguer menu icon for mobile */}
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    className='sm:hidden'
                />

                <NavbarBrand as={Link} href='/'>
                    <GiSoccerBall size={45} color='white' />
                    <div className='font-bold text-2xl text-white'>
                        <span className='font-normal'>Tirame un </span>
                        <span className='font-bold'>centro!</span>
                    </div>
                </NavbarBrand>
            </NavbarContent>

            {/* navigation for desktop screens */}
            <NavbarContent className='hidden sm:flex gap-4' justify='center'>
                <NavLink href='/users' label='Candidatos' />
                <NavLink href='/lists' label='Titulares' />
                <NavLink href='/messages' label='Mensajes' />
            </NavbarContent>

            <NavbarContent justify='end'>
                {/* check if loggedin      */}
                {session?.user ? (
                    <UserMenu user={session.user} />
                ) : (
                    <>
                        <NavbarItem className='hidden sm:flex'>
                            <Button as={Link} href='/login' variant='light' className='text-white'>Iniciar sesión</Button>
                        </NavbarItem>
                        <NavbarItem className='hidden sm:flex'>
                            <Button as={Link} href='/register' variant='light' className='text-white'>Registrarse</Button>
                        </NavbarItem>
                    </>
                )}

            </NavbarContent>

            {/* navigation for mobile screens */}
            <NavbarMenu>
                {filteredMenuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.label}-${index}`}>
                        <NavLink href={item.href} label={item.label} />
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
