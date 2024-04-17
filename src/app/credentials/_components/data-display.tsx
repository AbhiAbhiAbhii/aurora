'use client'
import CredentialView from '@/components/global/credential-view'
import { useGlobalContext } from '@/components/global/my-global-context'
import SettingView from '@/components/global/setting-view'
import SubscriptionView from '@/components/global/subscription-view'
import React from 'react'

type Props = {
  data: any
}

const DataDisplay = ({ data }: Props) => {

  const { linkValue } = useGlobalContext()

  return (
    <div className='border border-red-500'>
      {linkValue === "Credentials"
        ?
        <CredentialView 
          className='border'
          data={data}
        />
        :
        linkValue === "Subscriptions"
        ?
        <SubscriptionView />
        :
        linkValue === "Settings"
        ?
        <SettingView />
        :
        null}
    </div>
  )
}

export default DataDisplay