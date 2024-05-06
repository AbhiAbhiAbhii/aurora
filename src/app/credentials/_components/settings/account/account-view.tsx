import EditAccountForm from '@/components/forms/edit-account-form'
import AuroraText from '@/components/global/aurora-text'
import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {
  currentUser: any
}

const AccountView = ({ currentUser }: Props) => {
  return (
    <div>
      <div>
        <AuroraText 
          text='Account'
          className='font-inter font-medium text-base'
        />
        <AuroraText 
          text='This is your account settings.'
          className='font-inter font-normal text-sm text-muted-foreground'
        />
      </div>
      <Separator className='mt-6 h-[2px]' />
      <div className='mt-12'>
        <EditAccountForm
          currentUser={currentUser}
        />
      </div>
    </div>
  )
}

export default AccountView