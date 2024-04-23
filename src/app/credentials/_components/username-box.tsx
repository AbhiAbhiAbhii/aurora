import { useGlobalContext } from '@/components/global/my-global-context'
import { CopyIcon } from 'lucide-react'
import React from 'react'

type Props = {
    data: string
}

const UsernameBox = ({ data }: Props) => {
    
    const { setAlertTitle, setAlertDescription } = useGlobalContext()

    const CopyClick = () => {
        navigator.clipboard.writeText(data)
        setAlertTitle('Username Copied!')
        setAlertDescription('Your credential username is ready to be pasted.')
        const alertContainer = document.querySelector('.alert')
        alertContainer?.classList.add('alert-active')
        setTimeout(() => {
          alertContainer?.classList.remove('alert-active')
        }, 2000)
    }
  return (
    <div className="flex items-center space-x-2">
        <p className="">
            {data}
        </p>
        <CopyIcon 
        className="cursor-pointer"
        onClick={CopyClick}
        size={16}
        />
    </div>
  )
}

export default UsernameBox