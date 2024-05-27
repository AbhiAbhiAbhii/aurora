'use client'

import SwitcherBlock from "@/app/credentials/_components/switcher-block"
import { useEffect, useState } from "react"
import { getServiceDetails } from "@/lib/queries"
import { DataTable } from "@/app/credentials/_components/data-table"
import { columns } from "@/app/credentials/columns"
import { RocketIcon }  from "@radix-ui/react-icons"
import { useGlobalContext } from "../my-global-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { userCredentialColumn } from "./user-columns"
type Props = {}

const UserCredentialView = (props: Props) => {

  const {  tabValue, alertTitle, alertDescription } = useGlobalContext()

  const [ serviceData, setServiceData ] = useState<any>([])

  useEffect(() => {
  }, [])

  const filteredData = () => {
    // return serviceData.filter((item: any) => item.company_name === value && item.type === tabValue)
  }
  
  return (
    <div>
      <div 
        className="alert"
      >
        <Alert>
          <RocketIcon
            height={20}
            width={20}
            className="mt-1"
          />
          <AlertTitle className="font-inter font-medium text-sm">
            {alertTitle}
          </AlertTitle>
          <AlertDescription className="font-inter font-normal text-sm leading-3">
            {alertDescription}
          </AlertDescription>
        </Alert>
      </div>
      <SwitcherBlock />
       <div className="mt-12">
        {
          tabValue !== "All" ?
          <>
            <DataTable 
              columns={userCredentialColumn}
              data={serviceData}
            //   data={filteredData()}
            />
          </>
            :
          <>
            <DataTable 
              columns={userCredentialColumn}
              data={serviceData}
            />
          </>
        }
       </div>
    </div>
  )
}

export default UserCredentialView