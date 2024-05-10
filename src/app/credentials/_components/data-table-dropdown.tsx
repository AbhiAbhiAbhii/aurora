'use client'
import EditCredentialForm from '@/components/forms/edit-credential-form'
import AuroraText from '@/components/global/aurora-text'
import { useGlobalContext } from '@/components/global/my-global-context'
import { 
  AlertDialog,
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

import { deleteItem, getServiceRowDetails, getServiceURL } from '@/lib/queries'
import { 
  MoreHorizontal, 
  Trash2Icon 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { inputClassName } from '@/utils/classnames'

type Props = {
  rowUsernameData: string,
  rowPasswordData: string,
  rowServicenameData: string,
  checkState: boolean,
  id: number
}

const DataTableDropDown = ({ rowUsernameData, rowPasswordData, rowServicenameData, checkState, id }: Props) => {

  const { setAlertTitle, setAlertDescription, value } = useGlobalContext()
  const [ initValues, setInitValues ] = useState<any>()
  const [ serviceURL, setServiceURL ] = useState<string>("");

  const [ storeUsernameData, setStoreUsernameData ] = useState<string>("");
  const [ passwordData, setPasswordData ] = useState<string>("");
  const [ storeReceivermail, setStoreReceivermail ] = useState<string>("");
  const [ storeServicenameData, setStoreServicenameData ] = useState<string>("");

  let alertDialog: string = "Enter receiver's email"

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

  const ItemDeletedSuccess = () => {
    getAlertContainer()
    setAlertTitle('Item Deleted')
    setAlertDescription('Your selected credential were deleted')
    setTimeout(() => {
      location.reload()
    }, 2500)
  }

  const ItemDeletedError = () => {
    getAlertContainer()
    setAlertTitle('Item not deleted')
    setAlertDescription('Something went wrong and credential was not deleted')
  }

  const DeleteItem = async () => {
    let dataDeleted = await deleteItem(rowServicenameData)
    if(!dataDeleted.error) {
      ItemDeletedSuccess()
    } else {
      ItemDeletedError()
    }
  }

  useEffect(() => {
    async function SetInitialValues() {
      let data:any = await getServiceRowDetails(rowServicenameData)
      setInitValues(() => {
        let currentValue = data[0]
        return currentValue;
      })
    }
    SetInitialValues()
}, [value, rowServicenameData])

useEffect(() => {
  async function getURLData() {
    let data = await getServiceURL(id)
    setServiceURL(() => data)
  }
  getURLData();
}, [serviceURL, id])

useEffect(() => {
  setPasswordData(() => rowPasswordData);
  setStoreUsernameData(() => rowUsernameData);
  setStoreServicenameData(() => rowServicenameData);
}, [rowUsernameData, rowPasswordData, rowServicenameData]);

const storeReceivermailInput = (e:any) => setStoreReceivermail(() => e.target.value);

const sendEmail = async () => {

  const ourData = { passwordData, storeUsernameData, storeReceivermail, rowServicenameData };

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ourData})
    });
    if(response.ok) {
      console.log("Response is ok");
      return await response.json();
    }
  } catch(error) {
    console.log(error, "Mail failed to send")
  }
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
        <EditCredentialForm 
          checkState={checkState}
          serviceRowData={initValues}
        />
        <DropdownMenuItem
          onClick={UserNameCopy}
        >
          Copy Username
        </DropdownMenuItem>
        <DropdownMenuItem className='px-0'>
          <a className='w-full px-2' href={serviceURL} target='_blank'>
            Visit Login
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={PasswordCopy}
        >
          Copy Password
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-all hover:bg-[#F5F5F4]'>
              Share Credential
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertDialog}</AlertDialogTitle>
              <AlertDialogDescription>
                <input 
                  placeholder='thahaseer@gradical.xyz'
                  onChange={storeReceivermailInput}
                  className={inputClassName}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <DropdownMenuItem className='px-0 py-0 space-x-2'>
                <AlertDialogAction
                  className='p-0'
                >
                  <Button
                    onClick={sendEmail}
                  >
                    Share Credentials
                  </Button>
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </DropdownMenuItem>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div role="menuitem" 
              className="relative flex cursor-default select-none items-center
                justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
                focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"  
              data-orientation="vertical" data-radix-collection-item=""
            >
              <AuroraText 
                text="Delete"
              />
              <Trash2Icon size={15} />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the credential.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <DropdownMenuItem className='px-0 py-0'>
                <AlertDialogAction
                  className='p-0'
                >
                  <Button
                    onClick={DeleteItem}
                  >
                    Continue
                  </Button>
                </AlertDialogAction>
              </DropdownMenuItem>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DataTableDropDown