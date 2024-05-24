'use client'
import React, { useState } from 'react'
import { MyGlobalContext } from './my-global-context'
type Props = {
    children: React.ReactNode
}

const ContextWrapper = ({ children }: Props) => {

  const [ value, setValue ] = useState<string>("Gradical") // Company value
  const [ linkValue, setLinkValue ] = useState<string>("Credentials") // Link Value
  const [ tabValue, setTabValue ] = useState<string>("All") // Tab values
  const [ alertTitle, setAlertTitle ] = useState<string>("") // Alert title text
  const [ alertDescription, setAlertDescription ] = useState<string>("") // Alert title description
  const [ checkBoxIdValue, setCheckBoxIdValue ] = useState<any>([]) // Check boxId
  const [ isGodCheck, setIsGodCheck ] = useState<string>("") // Check Session Users is_god status 
  const [ currentSessionUser, setCurrentSessionUser ] = useState<any>()

  return (
    <MyGlobalContext.Provider 
      value={
        { 
          value, setValue, linkValue,
          setLinkValue, tabValue, setTabValue,
          alertTitle, setAlertTitle,
          alertDescription, setAlertDescription,
          checkBoxIdValue, setCheckBoxIdValue,
          isGodCheck, setIsGodCheck,
          currentSessionUser, setCurrentSessionUser
        }
      }
    >
      { children }
    </MyGlobalContext.Provider>
  )
}

export default ContextWrapper