import { useGlobalContext } from '@/components/global/my-global-context'
import { createClient } from '@/utils/supabase/client'
import { CopyIcon } from 'lucide-react'
import React from 'react'

type Props = {
  data: string
}

const PasswordFormat = ({ data }: Props) => {
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
    <div className="flex items-center space-x-2 mx-auto">
      <p className="password-format">
        Entha Mwone ?
      </p>
      <CopyIcon 
        className="cursor-pointer"
        onClick={CopyClick}
        size={16}
      />
    </div>
  )
}

export default PasswordFormat