'use client'
import { useGlobalContext } from '@/components/global/my-global-context'
import { DataValue } from '@/components/global/value'
import { ServiceData } from '@/lib/type'
import React from 'react'

type Props = {
  data: ServiceData[]
}

const CredentialsContent = ({ data }: Props) => {

  const { value } = useGlobalContext()

  return (
    <div>
      {
        data?.filter((item:any) => item.company_name === value)?.map((filterValue:any, index:number) => {
          return(
            <div className='flex text-left justify-between w-[700px] border border-rose-600' key={index}>
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
      }

    </div>
  )
}

export default CredentialsContent