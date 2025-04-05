import Link from 'next/link'
import React from 'react'
import { getMembers } from '../actions/memberActions'

export default async function UsersPage() {
  
  const members = await getMembers();
  
  return (
    <div>
        <h1 className='text-xl'>Comunidad de usuarios</h1>
        <Link href='/'>Volver</Link>
        <ul>
          {/* evalua si members is truthy, si lo es muestra names, si esta vacio, nada */}
          {members && members.map(member => (
            <li key={member.id}>{member.name}</li>
          ) )}
        </ul>
    </div>
  )
}
