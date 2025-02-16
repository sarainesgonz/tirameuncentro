import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { GiSoccerBall, GiFireball, GiThreeBurningBalls} from 'react-icons/gi'

export default function Nav() {
  return (
    <Navbar 
    maxWidth='xl'
    className='bg-gradient-to-r from-pink-700 to-pink-900'
    classNames={{
        item: [
            'text-white',
            'text-xl'
        ]
    }}>
        <NavbarBrand as={Link} href='/'>
            <GiSoccerBall size={45} color='white'/>
           <div className='font-bold text-2xl text-white'>
            <span className='font-semibold'>Tirame un </span>
            <span>centro!</span>
            </div> 
        </NavbarBrand>
        <NavbarContent justify='center'>
            <NavbarItem as={Link} href='/users'>Enganches</NavbarItem>
            <NavbarItem as={Link} href='/lists'>Tribuna</NavbarItem>
            <NavbarItem as={Link} href='/messages'>Mensajes</NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
            <Button as={Link} href='/login' variant='light' className='text-white'>Iniciar sesión</Button>
            <Button as={Link} href='/register' variant='light' className='text-white'>Registrarse</Button>
        </NavbarContent>
    </Navbar>
  )
}
