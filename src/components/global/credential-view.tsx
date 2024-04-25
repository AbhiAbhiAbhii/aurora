'use client'

import SwitcherBlock from "@/app/credentials/_components/switcher-block"
import { useEffect, useState } from "react"
import { getServiceDetails } from "@/lib/queries"
import { DataTable } from "@/app/credentials/_components/data-table"
import { columns } from "@/app/credentials/columns"
import { useGlobalContext } from "./my-global-context"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { RocketIcon }  from "@radix-ui/react-icons"
type Props = {}

const CredentialView = (props: Props) => {

  const { value, tabValue, alertTitle, alertDescription } = useGlobalContext()
  const [ serviceData, setServiceData ] = useState<any>([])

  useEffect(() => {
    const FetchServiceData = async() => {
      try {
        const serviceDetails = await getServiceDetails(value)
        if(serviceDetails) return setServiceData(serviceDetails)
      } catch (error) {
        console.log(error, "Something went WONG")
      } 
    }

    FetchServiceData()
  }, [value])

  const filteredData = () => {
    return serviceData.filter((item: any) => item.company_name === value && item.type === tabValue)
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
              columns={columns}
              data={filteredData()}
            />
          </>
            :
          <>
            <DataTable 
              columns={columns}
              data={serviceData}
            />
          </>
        }
       </div>
    </div>
  )
}

export default CredentialView