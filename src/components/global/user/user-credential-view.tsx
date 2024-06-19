'use client'
import SwitcherBlock from "@/app/credentials/_components/switcher-block"
import { DataTable } from "@/app/credentials/_components/data-table"
import { userCredentialColumn } from "./user-columns"
import AlertContainer from "../alert"
import { sharedCredentialsColumn } from "./shared-columns"
type Props = {
  userCredentialsData: any
  userFilteredData: any
  tabValue: any,
  sharedCredentialsData: any
}

const UserCredentialView = ({ userCredentialsData, userFilteredData, tabValue, sharedCredentialsData }: Props) => {


  return (
    <div>
      <AlertContainer />
      <SwitcherBlock />
       <div className="mt-12">
          {tabValue === 'All' ?
            <DataTable 
              columns={userCredentialColumn}
              data={userCredentialsData}
            />    
            :
            tabValue === 'Shared' ?
            <DataTable 
              columns={sharedCredentialsColumn}
              data={sharedCredentialsData}
            />
            :
            <DataTable 
              columns={userCredentialColumn}
              data={userFilteredData}
            />
          }
       </div>
    </div>
  )
}

export default UserCredentialView