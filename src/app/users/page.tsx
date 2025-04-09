import Link from 'next/link'
import React from 'react'
import { getMembers } from '../actions/memberActions'
import MemberCard from './MemberCard';

export default async function UsersPage() {
  
  const members = await getMembers();
  
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
        {/* <ul> */}
          {/* evalua si members is truthy, si lo es muestra names, si esta vacio, nada */}
          {members && members.map(member => (
            <MemberCard member={member} key={member.id}/>
          ) )}
        {/* </ul> */}
    </div>
  )
}
