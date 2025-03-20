"use client "

import React from 'react'
import { Session } from "next-auth"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@heroui/react'
import Link from 'next/link'
import { signOutUser } from '@/app/actions/authActions'

type Props = {
    user: Session["user"]
}
export default function UserMenu({ user }: Props) {
    return (
        <Dropdown placement="bottom-end" >
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transiton-transform hover:scale-110"
                    color="warning"
                    name={user?.name || "Usuario avatar"}
                    size='md'
                    src={user?.image || "/images/user.png"}
                />
            </DropdownTrigger>
            <DropdownMenu variant="bordered" aria-label="usermenu">
                <DropdownSection showDivider>
                    <DropdownItem 
                        key="userName"
                        isReadOnly 
                        as="span" 
                        aria-label="username"
                        className="h-10 flex flex-row">
                        Hola, {user?.name}!
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem 
                    key="editProfile"
                    as={Link} 
                    href="users/edit">
                    Editar perfil
                </DropdownItem>
                <DropdownItem 
                    key="signOut"
                    color="danger" 
                    onPress={async () => 
                    signOutUser()}>
                    Cerrar Sessión
                </DropdownItem>

            </DropdownMenu>
        </Dropdown>
    )
}
