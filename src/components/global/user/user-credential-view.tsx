'use client'
import SwitcherBlock from "@/app/credentials/_components/switcher-block"
import { DataTable } from "@/app/credentials/_components/data-table"
import { userCredentialColumn } from "./user-columns"
import AlertContainer from "../alert"
type Props = {
  userCredentialsData: any
  userFilteredData: any
  tabValue: any
}

const UserCredentialView = ({ userCredentialsData, userFilteredData, tabValue }: Props) => {

  return (
    <div>
      <AlertContainer />
      <SwitcherBlock />
       <div className="mt-12">
        {
          tabValue !== "All" ?
          <DataTable 
            columns={userCredentialColumn}
            data={userFilteredData}
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