'use client'

import { NavbarItem } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

// specify the type of props we are going to receive and destructure them
type Props = {
    href: string;
    label: string;
}

export default function NavLink({ href, label }: Props) {

    const pathName = usePathname();
    return (
        <NavbarItem isActive={pathName === href} as={Link} href={href}>{label}</NavbarItem>
    )
}
