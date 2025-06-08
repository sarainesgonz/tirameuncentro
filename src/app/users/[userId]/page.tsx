import { getMemberById } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function MemberDetailPage({params}
    : {params: Promise<{ userId: string }>}) {
    
        // params and searchParams are both promises in Next.js 15 
    // so we need to await them to get the actual values
    const { userId } = await params;

    const member = await getMemberById(userId);

     if (!member) return notFound();


    return (
    <div> {member.name} </div>
  )
}
