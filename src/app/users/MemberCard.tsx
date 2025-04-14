import { calculateAge } from '@/lib/util'
import { Card, CardFooter, Image, user } from '@heroui/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
  member: Member
} //get the type of member from the prisma client

export default function MemberCard({member} : Props) {
  return (
    //la card debe ocupar todo el ancho disponible y la imagen adaptarse al contenedor
    <Card 
    className='w-full relative'
    as={Link}
    href={`/users/${member.userId}`}
    isPressable
    >
      <Image
      src={member.image || '/images/user.png'}
      isZoomed
      alt={member.name}
      className='w-full aspect-square object-cover'
      />
      <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient w-full'>
        <div className='flex flex-col text-white'>
          <span className='font-semibold'>{member.name}, {calculateAge(member.dob)}</span>
          <span className='text-sm'>{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
