'use client'
import React, { useState } from 'react'
import SettingSwitcher from '@/app/credentials/_components/settings/settings-switcher'
import AddTeam from '@/app/credentials/_components/settings/team/add-team'
import AccountView from '@/app/credentials/_components/settings/account/account-view'
import AlertContainer from './alert'

type Props = {
  currentUser: any
  filteredUsers: any
}

const SettingView = ({ currentUser, filteredUsers }: Props) => {

  const [ tabState, setTabState ] = useState<string>('Account')
 
  return (
    <div className='flex justify-between'>
      <AlertContainer />
      <SettingSwitcher 
        tabState={tabState}
        setTabState={setTabState}
      />
      <div className='w-[60%]'>
        {tabState === 'Account' ?
          <AccountView 
            currentUser={currentUser}
          />
          :
          <AddTeam 
            filteredUsers={filteredUsers}
          />
        }
      </div>
    </div>
  )
}

export default SettingView