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
  const [ credentialInsert, setCredentialInsert ] = useState<boolean>(false)

  return (
    <MyGlobalContext.Provider 
      value={
        { 
          value, setValue, linkValue,
          setLinkValue, tabValue, setTabValue,
          credentialInsert, setCredentialInsert 
        }
      }
    >
      { children }
    </MyGlobalContext.Provider>
  )
}

export default ContextWrapper