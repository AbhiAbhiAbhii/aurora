'use client'

import SwitcherBlock from "@/app/credentials/_components/switcher-block"
import { DataTable } from "@/app/credentials/_components/data-table"
import { columns } from "@/app/credentials/columns"
import AlertContainer from "./alert"
type Props = {
  filteredData: any
  serviceData: any
  tabValue: any
}

const CredentialView = ({ filteredData, serviceData, tabValue }: Props) => {

  return (
    <div>
      <AlertContainer/>
      <SwitcherBlock />
       <div className="mt-12">
        {
          tabValue !== "All" ?
          <DataTable 
            columns={columns}
            data={filteredData}
          />
          :
          <DataTable 
            columns={columns}
            data={serviceData}
          />
        }
       </div>
    </div>
  )
}

export default CredentialView