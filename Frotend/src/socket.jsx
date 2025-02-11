import React from 'react'
import { useMemo } from 'react'
import { server } from './constants/config'
import { io } from "socket.io-client";

const SocketContext = React.createContext()
const getSocket=()=>React.useContext(SocketContext)

const SocketProvider = ({children}) => {
const socket = useMemo(() => io(server), [])

  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export {SocketProvider, getSocket} 