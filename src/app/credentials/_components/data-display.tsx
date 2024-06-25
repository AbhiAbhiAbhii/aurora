'use client'
import CredentialView from '@/components/global/credential-view'
import Loading from '@/components/global/loading'
import { useGlobalContext } from '@/components/global/my-global-context'
import SettingView from '@/components/global/setting-view'
import UserCredentialView from '@/components/global/user/user-credential-view'
import WorkSpace from '@/components/global/workspace/workspace'
import { currentSessionUserDetails, getServiceDetails } from '@/lib/queries'
import React, { useEffect, useState } from 'react'
type Props = {}

const DataDisplay = (props: Props) => {

  // Shared by team lead emails done
  // Team Lead mail done
  // In team mail done

  // Acquired all 3
  // Now workspacedata must be equal to these values

  const { linkValue, isGodCheck, setIsGodCheck, currentSessionUser, setCurrentSessionUser, setServiceTableName, value, tabValue, sharedCredentialsData, setSharedCredentialData, targetId } = useGlobalContext()
  const [ filteredUsers, setFilteredUsers ] = useState<any>()
  const [ workSpaceData, setWorkSpaceData ] = useState<any>([])
  const [ serviceData, setServiceData ] = useState<any>([])
  const [ userCredentialsData, setUserCredentialsData ] = useState<any>([])
  const [ isTeamLeadMail, setIsTeamLeadMail ] = useState<any>('')
  const [ inTeamMail, setInTeamMail ] = useState<any>('')

  // -------------------------
  // Workspace data

  if(currentSessionUser) {
    setIsGodCheck(() => currentSessionUser[0].is_god)
    setServiceTableName(() => {
      let text = isGodCheck ? 'Service' : 'Users_Servicenames'
      return text
    })
  }

  useEffect(() => {
    if(currentSessionUser) {
      if(isGodCheck) {
        const FetchServiceData = async() => {
          try {
            console.log("BBBBBBBB")
            const serviceDetails = await getServiceDetails(value)
            if(serviceDetails) return setServiceData(serviceDetails)
          } catch (error) {
            console.log(error, "Something went WONG")
          } 
        }
        FetchServiceData()
      } else {
        const url = "/api/UserCredential/SessionUserCredential"
        let sessionUserEmail: any = currentSessionUser[0].email

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


        // Shared credentials
        const sharedUrl = '/api/UserCredential/GetSharedCreds'

        async function getSharedCredentials() {
          const res = await fetch(sharedUrl, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({sessionUserEmail})
          })

          if(!res.ok) {
            console.log(`Error`)
          } else {
            const data = await res.json()
            console.log(data, "CLIENT SIDE DATA NETWORK RESPONSE")
            setSharedCredentialData(() => data)
          }
        }
        getSharedCredentials()
      }
    }
    console.log("RENDERRRRR")
  }, [value, currentSessionUser, isGodCheck])

  const userFilteredData = userCredentialsData.filter((item: any) => item.type === tabValue)

  const filteredData = serviceData.filter((item: any) => item.company_name === value && item.type === tabValue)

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
    if(currentSessionUser) {
      if(currentSessionUser[0].is_team_lead) {
        setIsTeamLeadMail(() => currentSessionUser[0].email)
      }
      if(!currentSessionUser[0].is_team_lead) {
        setInTeamMail(() => currentSessionUser[0].in_team)
      }
    }
  }, [currentSessionUser])

  useEffect(() => {

    if(!isGodCheck) { // Check A
      
      const fetchWorkSpaceData = async () => {

        const fetchWorkSpaceDataUrl = '/api/UserCredential/WorkSpace'
        const res = await fetch(fetchWorkSpaceDataUrl, {
          cache: 'no-store'
        })
        if(!res.ok) {
          console.log("Error fetching workspace data")
        } else {
          let { data }: any = await res.json()

          // Check B 
          if(data.filter((item: any) => item.shared_to_workspace === true)) {
            if(currentSessionUser) {
              if(currentSessionUser[0].is_team_lead) {
                setWorkSpaceData(() => data.filter((item: any) => item.shared_by_lead_email === isTeamLeadMail))
              } else {
                setWorkSpaceData(() => data.filter((item: any) => item.shared_by_lead_email === inTeamMail))
              }
            }
          } else null
        }
      }
      console.log('WorkSpace Data useEffect')
      fetchWorkSpaceData() 
    }
  }, [currentSessionUser, isGodCheck, isTeamLeadMail, inTeamMail])


  return (
    <>
    {
      currentSessionUser ?
      <div className='max-w-[90%] w-[1250px]'>
        {linkValue === "Credentials" ?
          isGodCheck ? 
            <CredentialView 
              filteredData={filteredData}
              serviceData={serviceData}
              tabValue={tabValue}
            /> 
            : 
            <UserCredentialView 
              sharedCredentialsData={sharedCredentialsData}
              userCredentialsData={userCredentialsData}
              userFilteredData={userFilteredData}
              tabValue={tabValue}
            />
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