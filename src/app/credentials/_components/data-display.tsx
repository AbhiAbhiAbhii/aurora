'use client'
import CredentialView from '@/components/global/credential-view'
import { useGlobalContext } from '@/components/global/my-global-context'
import SettingView from '@/components/global/setting-view'
import SubscriptionView from '@/components/global/subscription-view'
import React from 'react'

type Props = {}

const DataDisplay = (props: Props) => {

  const { linkValue } = useGlobalContext()

  return (
    <div className='max-w-[90%] w-[900px]'>
      {linkValue === "Credentials"
        ?
        <CredentialView />
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