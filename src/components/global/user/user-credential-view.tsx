'use client'

import SwitcherBlock from "@/app/credentials/_components/switcher-block"
import { useEffect, useState } from "react"
import { DataTable } from "@/app/credentials/_components/data-table"
import { useGlobalContext } from "../my-global-context"
import { userCredentialColumn } from "./user-columns"
import AlertContainer from "../alert"
type Props = {}

const UserCredentialView = (props: Props) => {

  const {  tabValue, alertTitle, alertDescription, currentSessionUser } = useGlobalContext()
  const [ userCredentialsData, setUserCredentialsData ] = useState<any>([])

  useEffect(() => {

    const sessionUserEmail = currentSessionUser[0].email
    const url = "/api/UserCredential/SessionUserCredential"

    async function getUserCredentialsData() {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({sessionUserEmail})
      })
      if(!res.ok) {
        console.log("Network request is not okay")
      } else {
        const { data } = await res.json()
        return setUserCredentialsData(() => data)
      }
    }
    getUserCredentialsData()
  }, [])
  
  const filteredData = () =>  userCredentialsData.filter((item: any) => item.type === tabValue)

  return (
    <div>
      <AlertContainer />
      <SwitcherBlock />
       <div className="mt-12">
        {
          tabValue !== "All" ?
          <DataTable 
            columns={userCredentialColumn}
            data={filteredData()}
          />
          :
          <DataTable 
            columns={userCredentialColumn}
            data={userCredentialsData}
          />
        }
       </div>
    </div>
  )
}

export default UserCredentialView