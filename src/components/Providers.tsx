'use client'

import React from 'react'
import {HeroUIProvider} from '@heroui/react'
// make toast available everywhere
import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'  

export default function Providers({children} : {children: React.ReactNode}) {
  return (
    <HeroUIProvider>
      <ToastContainer position="bottom-center"/> 
        {children}
    </HeroUIProvider>
)
}
// pass this to app