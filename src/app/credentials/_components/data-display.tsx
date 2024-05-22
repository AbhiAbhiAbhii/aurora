'use client'
import CredentialView from '@/components/global/credential-view'
import { useGlobalContext } from '@/components/global/my-global-context'
import SettingView from '@/components/global/setting-view'
import SubscriptionView from '@/components/global/subscription-view'
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import { Resend } from "resend"

type Props = {}

const DataDisplay = (props: Props) => {

  const { linkValue } = useGlobalContext()
  const [ currentUser, setCurrentUser ] = useState<any>();
  const [ filteredUsers, setFilteredUsers ] = useState<any>();

  useEffect(() => { // function to keep current user logged in at the top of settings view
    const supabase = createClient();
    
    async function userCheckAndFetchData() { // checking current user logged in
      const getCurrentUserEmail = (await supabase.auth.getUser()).data.user?.email;
      const usersAllData = (await supabase.from("User_Details").select("*")).data;

      setCurrentUser(() => {
        return usersAllData?.filter((user) => user.email === getCurrentUserEmail);
      })
    } 
    userCheckAndFetchData();

    async function filteredUsersData() {
      const getCurrentUserEmail = (await supabase.auth.getUser()).data.user?.email;
      const usersAllData = (await supabase.from("User_Details").select("*")).data;

      setFilteredUsers(() => { // fetching user details not logged in
        return usersAllData?.filter((user) => user.email !== getCurrentUserEmail);
      })
    }

    filteredUsersData();
  }, [])


  return (
    <div className='max-w-[90%] w-[1000px]'>
      {linkValue === "Credentials" ?
          <CredentialView 
          />
        :
        linkValue === "Subscriptions" ?
          <SubscriptionView />
        :
        linkValue === "Settings" ?
          <SettingView 
            filteredUsers={filteredUsers}
            currentUser={currentUser}
          />
        :
        null}
    </div>
  )
}

export default DataDisplay