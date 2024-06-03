'use client'
import React, { useEffect, useState } from 'react'
import SettingSwitcher from '@/app/credentials/_components/settings/settings-switcher'
import AddTeam from '@/app/credentials/_components/settings/team/add-team'
import { createClient } from '@/utils/supabase/client'
import AccountView from '@/app/credentials/_components/settings/account/account-view'

type Props = {
  currentUser: any
  filteredUsers: any
}

const SettingView = ({ currentUser, filteredUsers }: Props) => {

  const [ tabState, setTabState ] = useState<string>('Account')
 
  return (
    <div className='flex justify-between'>
      <SettingSwitcher 
        tabState={tabState}
        setTabState={setTabState}
      />
      <div className='w-[60%]'>
        {/* {
          tabState === "Account" && (
            <AccountView 
              currentUser={currentUser}
            />
          )
        }
        {
          tabState === "Team" && (
            <AddTeam 
              filteredUsers={filteredUsers}
              currentUser={currentUser}
            />
          )
        } */}
        {tabState === 'Account' ?
          <AccountView 
            currentUser={currentUser}
          />
          :
          <AddTeam 
            filteredUsers={filteredUsers}
            currentUser={currentUser}
          />
        }
      </div>
    </div>
  )
}

export default SettingView