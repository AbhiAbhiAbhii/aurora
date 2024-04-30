import { useGlobalContext } from '@/components/global/my-global-context'
import { createClient } from '@/utils/supabase/client'
import { CopyIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
    data: string
    checkValue: boolean
    ssoName: string
}

const PasswordFormat = ({ data, checkValue, ssoName }: Props) => {
    const { setAlertTitle, setAlertDescription } = useGlobalContext()
    const CopyClick = () => {
      navigator.clipboard.writeText(data)
      setAlertTitle('Password Copied!')
      setAlertDescription('Your credential password is ready to be pasted.')
      const alertContainer = document.querySelector('.alert')
      alertContainer?.classList.add('alert-active')
      setTimeout(() => {
        alertContainer?.classList.remove('alert-active')
      }, 2000)
    }

  return (
    <div className="flex items-center space-x-2">
        {
          checkValue ?
          <>
            {ssoName} SSO
          </>
          :
          <>
            <p className="password-format">
              Entha Mwone ?
            </p>
            <CopyIcon 
              className="cursor-pointer"
              onClick={CopyClick}
              size={16}
            />
          </>
        }
    </div>
  )
}

export default PasswordFormat