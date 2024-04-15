'use client'
import React, { useState } from 'react'
import { MyGlobalContext } from './my-global-context'
type Props = {
    children: React.ReactNode
}

const ContextWrapper = ({ children }: Props) => {

  const [ value, setValue ] = useState<string>("Select company...")
  const [ storedValue, setStoredValue ] = useState<string>("")

  return (
    <MyGlobalContext.Provider value={{ value, setValue, storedValue, setStoredValue }}>
      { children }
    </MyGlobalContext.Provider>
  )
}

export default ContextWrapper