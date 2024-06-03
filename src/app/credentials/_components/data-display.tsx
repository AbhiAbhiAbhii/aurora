'use client'
import CredentialView from '@/components/global/credential-view'
import Loading from '@/components/global/loading'
import { useGlobalContext } from '@/components/global/my-global-context'
import SettingView from '@/components/global/setting-view'
import UserCredentialView from '@/components/global/user/user-credential-view'
import WorkSpace from '@/components/global/workspace/workspace'
import { currentSessionUserDetails } from '@/lib/queries'
import React, { useEffect, useState } from 'react'
import { PacmanLoader } from "react-spinners"
type Props = {}

const DataDisplay = (props: Props) => {

  const { linkValue, isGodCheck, setIsGodCheck, currentSessionUser, setCurrentSessionUser, setServiceTableName } = useGlobalContext()
  const [ filteredUsers, setFilteredUsers ] = useState<any>()
  const [ workSpaceData, setWorkSpaceData ] = useState<any>()

    if(currentSessionUser) {
      setIsGodCheck(() => currentSessionUser[0].is_god)
      setServiceTableName(() => {
        let text = isGodCheck ? 'Service' : 'Users_Servicenames'
        return text
      })
    }

  useEffect(() => { // function to keep current user logged in at the top of settings view
    
    async function userCheckAndFetchData() { // checking current user logged in
      const { getCurrentUserEmail, usersAllData } = await currentSessionUserDetails() // destructured current session user details
      setCurrentSessionUser(() => {
        return usersAllData?.filter((user) => user.email === getCurrentUserEmail)
      })
    } 
    userCheckAndFetchData()

    async function filteredUsersData() { // filter user not currentUser
      const { getCurrentUserEmail, usersAllData } = await currentSessionUserDetails() // destructured current session user details
      setFilteredUsers(() => { // fetching user details not logged in
        return usersAllData?.filter((user) => user.email !== getCurrentUserEmail)
      })
    }

    filteredUsersData()
  }, [])

  useEffect(() => {
    if(!isGodCheck) {
      const fetchWorkSpaceData = async () => {
        const res = await fetch("/api/UserCredential/WorkSpace", {
          cache: 'no-store'
        })
        if(!res.ok) {
          console.log("Error fetching workspace data")
        } else {
          let {data}: any = await res.json()
          setWorkSpaceData(() => data)
        }
      }
      fetchWorkSpaceData()
    } else {
      null
    }
  }, [])


  return (
    <>
    {
      currentSessionUser ?
      <div className='max-w-[90%] w-[1250px]'>
        {linkValue === "Credentials" ?
          isGodCheck ? <CredentialView /> : <UserCredentialView />
          :
          linkValue === "Workspace" ?
            <WorkSpace workSpaceData={workSpaceData} />
          :
          linkValue === "Settings" ?
            <SettingView 
              filteredUsers={filteredUsers}
              currentUser={currentSessionUser}
            />
          :
        null}
      </div>
    :
    <div
      className='flex items-center justify-center h-screen w-full'
    >
      <Loading />
    </div>
    }
    </>
  )
}

export default DataDisplay