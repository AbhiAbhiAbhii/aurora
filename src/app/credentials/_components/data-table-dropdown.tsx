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
import UserEditCredentialForm from '@/components/forms/user-forms/user-edit-credential-form'

type Props = {
  rowUsernameData: string,
  rowPasswordData: string,
  rowServicenameData: string,
  checkState: boolean,
  id: number,
  allRowData?: any
}

const DataTableDropDown = ({ rowUsernameData, rowPasswordData, rowServicenameData, checkState, id, allRowData }: Props) => {

  const { setAlertTitle, setAlertDescription, value, isGodCheck, serviceTableName, tabValue } = useGlobalContext()
  const [ initValues, setInitValues ] = useState<any>()
  const [ serviceURL, setServiceURL ] = useState<any>()

  const [ storeUsernameData, setStoreUsernameData ] = useState<string>("")
  const [ passwordData, setPasswordData ] = useState<string>("")
  const [ storeReceivermail, setStoreReceivermail ] = useState<string>("")

  const [ editLogs, setEditLogs ] = useState<any>()
  const [ createdAtLog, setCreatedAtLog ] = useState<any>()
  const [ getCurrentAuthUser, setGetCurrentAuthUser ] = useState<any>()

  let tableName

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

  const messageFunction = (title: string, description: string) => {
    getAlertContainer()
    setAlertTitle(title)
    setAlertDescription(description)
  }
  const PasswordCopy = () => {
    copyToClipBoard(rowPasswordData)
    messageFunction('Password Copied!', 'Your credential password is ready to be pasted.')
  }
  
  const UserNameCopy = () => {
    copyToClipBoard(rowUsernameData)
    messageFunction('Username Copied!', 'Your credential username is ready to be pasted.')
  }
  
  const ItemDeletedSuccess = () => {
    messageFunction('Item Deleted', 'Your selected credential were deleted')
  }

  const ItemDeletedError = () => {
    messageFunction('Item not deleted', 'Something went wrong and credential was not deleted')
  }

  // const emailSendSuccess = () => {
  //   messageFunction('Email Sent', `Your selected credential was sent to ${storeReceivermail}`)
  // }

  const shareUpdateStatus = (title: string, description: string) => messageFunction(title, description)

  const DeleteItem = async () => {
    tableName = isGodCheck ? 'Service' : 'Users_Servicenames'
    const deleteData = {rowServicenameData, tableName}
    const res = await fetch("/api/UserCredential/DropDownDelete", {
      method: "DELETE",
      headers: {
        'Content-type': 'applications/json'
      },
      body: JSON.stringify(deleteData)
    })
    if(!res.ok) {
      ItemDeletedError()
    } else {
      ItemDeletedSuccess()
      setTimeout(() => reloadPage(), 1500)
    }
  }

  useEffect(() => {
    async function SetInitialValues() {
      let ourTableName: any = tabValue === 'Shared' ? 'shared_table' : serviceTableName

      let data:any = await getServiceRowDetails(rowServicenameData, ourTableName)
      setInitValues(() => {
        let currentValue = data[0]
        return currentValue;
      })
    }
    SetInitialValues()
}, [value, rowServicenameData])

useEffect(() => {
  async function getURLData() {
    let ourTableName: any = tabValue === 'Shared' ? 'shared_table' : serviceTableName
    let data: any = await getServiceURL(id, ourTableName)
    let ourData: any =  data.URL
    setServiceURL(() => ourData)
  }
  getURLData()
}, [id])

useEffect(() => {
  setPasswordData(() => rowPasswordData)
  setStoreUsernameData(() => rowUsernameData)
}, [rowUsernameData, rowPasswordData])

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

  const { name, email } = getCurrentAuthUser
  const {
    boolean, 
    rowCompanyNameData,
    rowLoginTypeData,
    rowPasswordData,
    rowSSONameData,
    rowServicenameData,
    rowTypeData,
    rowUsernameData,
    serviceId,
    rowURLData,
    rowAdditionalNotesData,
  } = allRowData

  const sendData = {
    boolean, 
    rowCompanyNameData,
    rowLoginTypeData,
    rowPasswordData,
    rowSSONameData,
    rowServicenameData,
    rowTypeData,
    rowUsernameData,
    serviceId,
    rowURLData,
    rowAdditionalNotesData,
    storeReceivermail
  }

  const res = await fetch('/api/send', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(sendData)
  })
  
  
  if(!res.ok) {
    const { title, message } = await res.json()
    console.log(title, message, "network response not okay")
    return shareUpdateStatus(title, message)
  } else {
    const { title, message } = await res.json()
    const { dateString, timeString } = getCurrentDate()
    const itemsEdited = `${rowServicenameData} credentials was shared to ${storeReceivermail}`

    console.log(title, message, "network response okay")
    await insertEditLog(name, email, dateString, timeString, rowServicenameData, itemsEdited)
    
    shareUpdateStatus(title, message)
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
        {isGodCheck ? 
          <EditCredentialForm 
            checkState={checkState}
            serviceRowData={initValues}
          />
        :
          tabValue === 'Shared' ?
          null
          :
          <UserEditCredentialForm 
            serviceRowData={initValues}
          />
        }
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
        {
          tabValue === 'Shared' ?
          null
          :
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
        }
        <DropdownMenuSeparator />
        {tabValue === 'Shared' ?
        null
      :
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
      }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DataTableDropDown