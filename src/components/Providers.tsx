'use client'

import React, {createContext,  useContext } from 'react';
import {HeroUIProvider} from '@heroui/react'
// make toast available everywhere
import { ToastContainer } from 'react-toastify'

// import 'react-toastify/dist/ReactToastify.css'  

const SessionContext = createContext<any>(null); //creo context para la session

// exporto hook para usar la session en cualquier componente
export function useSession() {
  return useContext(SessionContext)
}

export default function Providers({children, session} : {children: React.ReactNode, session: any}) {
  return (
    <HeroUIProvider>
      <SessionContext.Provider value={session}>

      <ToastContainer position="bottom-center"/> 
        {children}
      </SessionContext.Provider>
    </HeroUIProvider>
)
}
// pass this to app