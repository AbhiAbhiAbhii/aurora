import AuroraText from '@/components/global/aurora-text'
import { useGlobalContext } from '@/components/global/my-global-context'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash2Icon } from 'lucide-react'
import React from 'react'

type Props = {
    rowUsernameData: string,
    rowPasswordData: string
}

const DataTableDropDown = ({ rowUsernameData, rowPasswordData }: Props) => {

    const { setAlertTitle, setAlertDescription } = useGlobalContext()

    const getAlertContainer = () => {
        let alertContainer = document.querySelector('.alert')
        alertContainer?.classList.add('alert-active')
        setTimeout(() => {
            alertContainer?.classList.remove('alert-active')
        }, 2000)
    }

    const copyToClipBoard = (data:string) => {
        navigator.clipboard.writeText(data)
    }

    const UserNameCopy = () => {
        copyToClipBoard(rowUsernameData)
        getAlertContainer()
        setAlertTitle('Username Copied!')
        setAlertDescription('Your credential username is ready to be pasted.')
    }

    const PasswordCopy = () => {
        copyToClipBoard(rowPasswordData)
        getAlertContainer()
        setAlertTitle('Password Copied!')
        setAlertDescription('Your credential password is ready to be pasted.')
    }

  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className="h-6 w-6 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={10} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={UserNameCopy}
            >
              Copy Username
            </DropdownMenuItem>
            <DropdownMenuItem>Visit Login</DropdownMenuItem>
            <DropdownMenuItem
                onClick={PasswordCopy}
            >
                Copy Password
            </DropdownMenuItem>
            <DropdownMenuItem>Share Credential</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center justify-between"
            >
              <AuroraText 
                text="Delete"
              />
              <Trash2Icon size={15} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default DataTableDropDown