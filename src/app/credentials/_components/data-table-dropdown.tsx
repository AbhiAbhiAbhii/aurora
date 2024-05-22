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

import { deleteItem, getAuthUsers, getCreatedAtLog, getCurrentUserAllDetail, getEditLogs, getServiceRowDetails, getServiceURL, insertEditLog } from '@/lib/queries'
import { 
  MoreHorizontal, 
  Trash2Icon 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { inputClassName } from '@/utils/classnames'
import VersionHistory from '@/components/logs/version_history/edit-version-history'
import { MessageFunction } from '@/utils/functions/alert-function'
import { reloadPage } from '@/utils/functions/reload'
import { getCurrentDate } from '@/utils/functions/date'

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
  const [ serviceURL, setServiceURL ] = useState<string>("")

  const [ storeUsernameData, setStoreUsernameData ] = useState<string>("")
  const [ passwordData, setPasswordData ] = useState<string>("")
  const [ storeReceivermail, setStoreReceivermail ] = useState<string>("")
  const [ storeServicenameData, setStoreServicenameData ] = useState<string>("")

  const [ editLogs, setEditLogs ] = useState<any>()
  const [ createdAtLog, setCreatedAtLog ] = useState<any>()
  const [ getCurrentAuthUser, setGetCurrentAuthUser ] = useState<any>()

  let alertDialog: string = "Enter receiver's email"
  let itemClassName: string = "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-all hover:bg-[#F5F5F4]"

  const copyToClipBoard = (data:string) => {
    navigator.clipboard.writeText(data)
  }

  const getAlertContainer = () => {
    let alertContainer = document.querySelector('.alert')
    alertContainer?.classList.add('alert-active')
    setTimeout(() => {
      alertContainer?.classList.remove('alert-active')
    }, 2000)
  }

  const UserNameCopy = () => {
    copyToClipBoard(rowUsernameData)
    MessageFunction('Username Copied!', 'Your credential username is ready to be pasted.')
  }

  const PasswordCopy = () => {
    copyToClipBoard(rowPasswordData)
    MessageFunction('Password Copied!', 'Your credential password is ready to be pasted.')
  }

  const messageFunction = (title: string, description: string) => {
    getAlertContainer()
    setAlertTitle(title)
    setAlertDescription(description)
  }

  const ItemDeletedSuccess = () => {
    messageFunction('Item Deleted', 'Your selected credential were deleted')
  }

  const ItemDeletedError = () => {
    messageFunction('Item not deleted', 'Something went wrong and credential was not deleted')
  }

  const emailSendSuccess = () => {
    messageFunction('Email Sent', `Your selected credential was sent to ${storeReceivermail}`)
  }

  const DeleteItem = async () => {
    let dataDeleted = await deleteItem(rowServicenameData)
    if(!dataDeleted.error) {
      ItemDeletedSuccess()
    } else {
      ItemDeletedError()
    } 
    setTimeout(() => reloadPage(), 1500)
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

useEffect(() => {
  const fetchEditLogs = async () => {
    setEditLogs(await getEditLogs(rowServicenameData))
  }
  fetchEditLogs()
}, [])

useEffect(() => {
  const fetchCreatedAtLog = async () => {
    setCreatedAtLog(await getCreatedAtLog(rowServicenameData))
  }
  fetchCreatedAtLog()
}, [])

useEffect(() => {
  const fetchCurrentAuthUser = async () => {
    let data: any = await getCurrentUserAllDetail()
    setGetCurrentAuthUser(() => data.data[0])
  }
  fetchCurrentAuthUser()
}, [])

const storeReceivermailInput = (e:any) => setStoreReceivermail(() => e.target.value)


const sendEmail = async () => {

  const ourData = { passwordData, storeUsernameData, storeReceivermail, rowServicenameData }
  
  const { name, email } = getCurrentAuthUser
  const { dateString, timeString } = getCurrentDate() // destructure time and date

  const itemsEdited = `${rowServicenameData} credentials was shared to ${storeReceivermail}`

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
      emailSendSuccess()
      await insertEditLog(name, email, dateString, timeString, rowServicenameData, itemsEdited)
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
        <div
          className={itemClassName}
        >
          <VersionHistory 
            rowServicenameData={rowServicenameData}
            createdAtLog={createdAtLog}
            editLogs={editLogs}
          />
        </div>
        <DropdownMenuItem
          onClick={PasswordCopy}
        >
          Copy Password
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className={itemClassName}>
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
              className={`${itemClassName} justify-between`} 
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