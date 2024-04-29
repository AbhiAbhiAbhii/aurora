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
  const [ alertTitle, setAlertTitle ] = useState<string>("")
  const [ alertDescription, setAlertDescription ] = useState<string>("")

  const [ checkBoxIdValue, setCheckBoxIdValue ] = useState<any>([])
  const [ isGoogle, setIsGoogle ] = useState<boolean>(false)


  return (
    <MyGlobalContext.Provider 
      value={
        { 
          value, setValue, linkValue,
          setLinkValue, tabValue, setTabValue,
          credentialInsert, setCredentialInsert,
          alertTitle, setAlertTitle,
          alertDescription, setAlertDescription,
          checkBoxIdValue, setCheckBoxIdValue,
          isGoogle, setIsGoogle
        }
      }
    >
      { children }
    </MyGlobalContext.Provider>
  )
}

export default ContextWrapper