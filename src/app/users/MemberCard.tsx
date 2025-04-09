import { Card, CardFooter, Image } from '@heroui/react'
import { Member } from '@prisma/client'
import React from 'react'

type Props = {
  member: Member
} //get the type of member from the prisma client

export default function MemberCard({member} : Props) {
  return (
    <Card fullWidth>
      <Image
      width={400}
      src={member.image || '/images/user.png'}
      isZoomed
      alt={member.name}
      className='aspect-square object-cover'
      />
      <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient'>
        <div className='flex flex-col text-white'>
          <span className='font-semibold'>{member.name}</span>
          <span className='text-sm'>{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
