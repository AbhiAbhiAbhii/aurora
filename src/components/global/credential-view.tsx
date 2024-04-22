'use client'

import SwitcherBlock from "@/app/credentials/_components/switcher-block"
import { useGlobalContext } from "./my-global-context"
import { useEffect, useState } from "react"
import { getServiceDetails } from "@/lib/queries"
import { TabsContent } from "../ui/tabs"

type Props = {}
const CredentialView = (props: Props) => {

  const { value, tabValue } = useGlobalContext()
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

  return (
    <div>
      <SwitcherBlock />
       <div className="mt-12">
        {
          tabValue !== "All" ?
            serviceData.filter((item:any) => item.company_name === value && item.type === tabValue).map((filterValue:any, index: number) => {
              return(
                <div className='flex text-left justify-between' key={index}>
                  <p>
                    {filterValue.service_name}
                  </p>
                  <p>
                    {filterValue.password}
                  </p>
                  <p>
                    {filterValue.type}
                  </p>
                  <p>
                    {filterValue.user_name}
                  </p>
                </div>
              )
            })
            :
            serviceData.map((item:any, index: number) => (
              <div className='flex text-left justify-between' key={index}>
                <p>
                  {item.service_name}
                </p>
                <p>
                  {item.password}
                </p>
                <p>
                  {item.type}
                </p>
                <p>
                  {item.user_name}
                </p>
              </div>
            ))
        }
       </div>
    </div>
  )
}

export default CredentialView