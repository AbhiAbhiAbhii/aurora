'use client'
import React, { useState } from 'react'
import { MyGlobalContext } from './my-global-context'
type Props = {
    children: React.ReactNode
}

const ContextWrapper = ({ children }: Props) => {

  const [ value, setValue ] = useState<string>("Gradical")
  const [ linkValue, setLinkValue ] = useState<string>("Credentials")
  const [ tabValue, setTabValue ] = useState<string>("All")

  return (
    <MyGlobalContext.Provider 
      value={{ value, setValue, linkValue, setLinkValue, tabValue, setTabValue }}
    >
      { children }
    </MyGlobalContext.Provider>
  )
}

export default ContextWrapper