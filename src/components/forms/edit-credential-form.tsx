'use client'
import React, { useEffect, useRef, useState } from 'react'
import { 
    Sheet, 
    SheetClose, 
    SheetContent, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from '@/components/ui/sheet'
import { deleteRowItem, editLinkedPassword, getAuthUsers, getCurrentUserAllDetail, getServiceRowDetails, getUserDetails, insertEditLog, updateCreatedAtLog, updateItem } from '@/lib/queries'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import SelectArrowIcon from '@/app/credentials/_components/select-arrow-icon'
import { useGlobalContext } from '../global/my-global-context'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { EyeNoneIcon } from '@radix-ui/react-icons'
import { inputClassName } from '@/utils/classnames'
import { getCurrentDate } from '@/utils/functions/date'
import { getAlertContainer } from '@/utils/functions/alert-function'
import { reloadPage } from '@/utils/functions/reload'


type Props = {
    serviceRowData: any
    checkState: boolean
}

interface TabValue {
    tab: string
}

const EditCredentialForm = ({serviceRowData, checkState }: Props) => {

    const tabs: TabValue[] = [
        {
            tab: 'All'
        },
        {
            tab: 'Operations'
        },
        {
            tab: 'Socials'
        },
        {
            tab: 'Subscriptions'
        },
    ]

    let labelClassName: string = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
    let selectCustomClassName: string = "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 relative"
    let textAreaClassName: string = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
    let alertDialogTriggerClassName: string = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive/90 h-10 px-4 py-2 bg-[#631F0A] text-zinc-50"
    
    const ref: any = useRef()

    const { setAlertDescription, setAlertTitle, serviceTableName } = useGlobalContext()
    const [ users, setUsers ] = useState<any>([]) 
    const [ authUser, setAuthUser ] = useState<any>()
    const [ detectRole, setDetectRole ] = useState<any>()
    const [ buttonSelectClick, setButtonSelectClick ] = useState<boolean>(false)
    const [ buttonManagedSelectClick, setButtonManagedSelectClick ] = useState<boolean>(false)

    const [ typeData, setTypeData ] = useState<string>("")
    const [ serviceNameData, setServiceNameData ] = useState<string>("")
    const [ userNameData, setUserNameData ] = useState<string>("")
    const [ passwordData, setPasswordData ] = useState<string>("")
    const [ urlData, setUrlData ] = useState<string>("")
    const [ managedbyData, setManagedbyData ] = useState<string>("")
    const [ additionalNotesData, setAdditionalNotesData ] = useState<string>("")
    const [ ssoNameData, setSsoNameData ] = useState<string>("")
    const [ togglePassClick, setTogglePassClick ] = useState<boolean>(false)

    const [ currentUser, setCurrentUser ] = useState<any>()


    const messageFunction = (title: string, description: string) => {
        getAlertContainer()
        setAlertTitle(title)
        setAlertDescription(description)
    }

    const updateSuccess = () => {
        messageFunction("Item Updated", "Your credential has been updated successfully")
        setTimeout(() => reloadPage(), 1500)
    }

    const deleteSuccess = () => {
        messageFunction("Item Deleted", "Your selected credential were deleted")
        setTimeout(() => reloadPage(), 1500)
    }

    const deleteRow = async (e?: any) => {
        e.preventDefault()
        await deleteRowItem(serviceRowData.id)
        deleteSuccess()
    }

    const handleButtonSelectClick = (e:any) => {
        e.preventDefault()
        setButtonSelectClick((prevState) => !prevState)
    } 

    const handleManagedButtonClick = (e:any) => { // only available to superadmin for edit form
        e.preventDefault()
        setButtonManagedSelectClick((prevState) => !prevState)
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            setUsers(await getUserDetails())
        }
    fetchUserDetails()
    }, [])

    useEffect(() => {
        const fetchAuthUserDetails = async () => {
            setAuthUser(await getAuthUsers())
        }
    fetchAuthUserDetails()
    }, [])

    useEffect(() => {
        const setDetectRoleFunction = async () => {
            users.filter((item:any) => item.email === authUser.user.email).map((filterValue:any) => {
                setDetectRole(filterValue)
            })
        }
        setDetectRoleFunction()
    }, [users])

    useEffect(() => {
        setServiceNameData(serviceRowData.service_name)
        setTypeData(serviceRowData.type)
        setUserNameData(serviceRowData.user_name)
        setPasswordData(serviceRowData.password)
        setUrlData(() => serviceTableName == "Service" ? serviceRowData.URL : serviceRowData.url)
        setManagedbyData(serviceRowData.managed_by)
        setAdditionalNotesData(serviceRowData.additional_notes)
        setSsoNameData(serviceRowData.sso_name)
    }, [
        serviceRowData.service_name, 
        serviceRowData.type, 
        serviceRowData.user_name, 
        serviceRowData.password, 
        serviceRowData.URL,
        serviceRowData.url, 
        serviceRowData.managed_by, 
        serviceRowData.additional_notes,
        serviceRowData.sso_name
    ])

    useEffect(() => {
        async function getCurrentUser() {
          let data: any = await getCurrentUserAllDetail()
          setCurrentUser(() => data.data[0])
        }
        getCurrentUser()
    }, [])


    const editCredentialItemSubmit = async (e:any) => {
        e.preventDefault()
        const { name, email } = currentUser
        const { dateString, timeString } = getCurrentDate()

        const err = await editLinkedPassword(passwordData, userNameData)
        if(err) {
            console.log("Something went WONG")
        } else {
            // compare logic 
            let itemsEdited: any
            let ourUrl = serviceTableName === "Service" ? serviceRowData.URL : serviceRowData.url
            let prevData: any = {
                type: serviceRowData.type,
                service_name: serviceRowData.service_name,
                username: serviceRowData.user_name,
                password: serviceRowData.password,
                URL: ourUrl,
                managed_by: serviceRowData.managed_by,
                additional_notes: serviceRowData.additional_notes,
                sso_name: serviceRowData.sso_name
            }
            
            let updatedData: any = {
                type: typeData,
                service_name: serviceNameData,
                username: userNameData,
                password: passwordData,
                URL: urlData,
                managed_by: managedbyData,
                additional_notes: additionalNotesData,
                sso_name: ssoNameData
            }

            const differentKeys = []

            const prevDataKeys = Object.keys(prevData)
            const updatedDataKeys = Object.keys(updatedData)
            
            if (prevDataKeys.length !== updatedDataKeys.length) {
                alert("Objects do not have the same length")
            } else {
                for (let key of prevDataKeys) {
                    if(prevData[key] !== updatedData[key]) {
                        differentKeys.push(key)
                    } 
                    if(differentKeys.length > 0) {
                        itemsEdited = `Credential fields ${differentKeys.join(", ")} edited`
                        updateSuccess()
                    } else {
                        console.log("No changes were found")
                    }
                }
            }
            await insertEditLog(name, email, dateString, timeString, serviceNameData, itemsEdited)
            await updateItem(
                serviceRowData.id,
                serviceRowData.company_name,
                serviceNameData,
                passwordData,
                typeData,
                userNameData,
                urlData,
                additionalNotesData,
                managedbyData,
                serviceTableName,
                ssoNameData
            )
            await updateCreatedAtLog(serviceNameData, serviceRowData.service_name)
        }   
    }

  return (
    <Sheet>
        <SheetTrigger asChild>
            <div role="menuitem" 
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-all hover:bg-[#F5F5F4]" 
            >
                Edit
            </div>
        </SheetTrigger>
        <SheetContent 
            className="w-[80%] min-w-[500px] overflow-y-scroll"
        >
            <div className="w-[380px] min-w-[80%] ml-4">
                <SheetHeader className="mt-8">
                    <SheetTitle 
                        className="font-geist font-medium text-2xl text-foreground"
                    >
                        Edit Credential
                    </SheetTitle>
                </SheetHeader>
                <div 
                    className="mt-4"
                >
                    <form 
                        onSubmit={editCredentialItemSubmit}
                    >
                        {/* Type */}
                        <div
                            className='flex flex-col space-y-2 mb-4'
                        >
                            <label
                                className={labelClassName}
                            >
                                What type of credential is this?
                            </label>
                            <button
                                onClick={handleButtonSelectClick}
                                className={selectCustomClassName}
                            >
                                <span style={{pointerEvents: 'none'}}>{typeData}</span>
                                <SelectArrowIcon />
                                { buttonSelectClick && <div
                                    className={`select-custom-box-activate border bg-white rounded-md`}
                                >
                                    <div className='font-semibold flex py-[0.45rem] items-start text-sm pointer-events-none cursor-default'>
                                        <p className='ml-7'>
                                            Type of Credentials
                                        </p>
                                    </div>
                                    <div>
                                        {
                                            tabs.slice(1).map((item) => (
                                                <div
                                                    onClick={(e:any) => setTypeData(e.target.outerText)}
                                                    key={item.tab} 
                                                    className='flex py-[0.45rem] items-start text-sm hover:bg-[#F5F5F4] transition rounded-md'
                                                >
                                                    <p className='ml-7'>
                                                        {item.tab}
                                                    </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>}
                            </button>
                        </div>
                        {/* Servicename */}
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className={labelClassName}>
                                Service Name
                            </label>
                            <input 
                                value={serviceNameData}
                                placeholder={serviceNameData}
                                onChange={(e) => {
                                    setServiceNameData(() => {
                                        let updatedServiceNameData = e.target.value
                                        return updatedServiceNameData
                                    })
                                }}
                                name='service_name'
                                className={`${inputClassName}`}
                                type="text" 
                            />
                        </div>
                        {/* Username */}
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className={labelClassName}>
                                Username
                            </label>
                            <input
                                value={userNameData}
                                onChange={(e) => setUserNameData(e.target.value)}
                                name='user_name' 
                                className={inputClassName}
                                type="text" 
                            />
                        </div>
                        {
                            checkState && (
                                <div className='flex flex-col space-y-2 mb-4'>
                                    <label className={labelClassName}>
                                        SSO Name
                                    </label>
                                    <input 
                                        onChange={(e) => {
                                            setSsoNameData(() => {
                                                let inputValue = e.target.value
                                                return inputValue
                                            })
                                        }}
                                        value={ssoNameData}
                                        className={inputClassName}
                                    />
                                </div>
                            )
                        }
                        {/* Password*/}
                        {
                            !checkState && (
                                <div className='flex flex-col space-y-2 mb-4'>
                                    <label className={labelClassName}>
                                        Password
                                    </label>
                                    <div
                                        className='w-full relative'
                                    >
                                        <input
                                            value={passwordData}
                                            onChange={(e) => setPasswordData(e.target.value)}
                                            name='password' 
                                            className={inputClassName}
                                            type={
                                                togglePassClick ?
                                                "text"
                                                :
                                                "password"
                                            }
                                        />
                                        <div
                                            onClick={() => setTogglePassClick((prevValue) => !prevValue)}
                                            className="absolute top-0 right-0 flex items-center justify-center h-full w-9 border-0 border-l cursor-pointer"
                                        >
                                            <EyeNoneIcon />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {/* URL */}
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className={labelClassName}>
                                URL
                            </label>
                            <input
                                value={urlData}
                                onChange={(e) => setUrlData(e.target.value)}
                                name='URL' 
                                className={inputClassName}
                                type="text" 
                            />
                        </div>

                        {/* Managed by */}
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className={labelClassName}>
                                Managed by
                            </label>
                            {
                                detectRole?.is_god ? (
                                    <button
                                        onClick={handleManagedButtonClick}
                                        className={selectCustomClassName}
                                    >
                                        <span style={{pointerEvents: 'none'}}>{managedbyData}</span>
                                        <SelectArrowIcon />
                                        { buttonManagedSelectClick && <div
                                            className={`select-custom-box-activate border bg-white rounded-md`}
                                        >
                                            <div 
                                                className='font-semibold flex 
                                                py-[0.45rem] items-start text-sm 
                                                pointer-events-none cursor-default'
                                            >
                                                <p className='ml-7'>
                                                    Users
                                                </p>
                                            </div>
                                            <div>
                                                {
                                                    users.map((item:any, index:number) => (
                                                        <div onClick={(e:any) => setManagedbyData(e.target.outerText)} 
                                                            className='flex py-[0.45rem] items-start
                                                            text-sm hover:bg-[#F5F5F4] transition rounded-md' 
                                                            key={index}
                                                        >
                                                            <p className='ml-7'>
                                                                {item.user_name}
                                                            </p>
                                                        </div>
                                                    ))  
                                                }   
                                            </div>
                                        </div>}
                                    </button>
                                )
                                : (
                                    <div 
                                        className={selectCustomClassName}
                                    >
                                        <p>
                                            {detectRole?.user_name}
                                        </p>
                                    </div> 
                                )
                            }
                        </div>
                        {/* Additional notes */}
                        <div className='flex flex-col space-y-2 mb-12'>
                            <label className={labelClassName}>
                                Additional Notes
                            </label>
                            <textarea value={additionalNotesData} onChange={(e:any) => setAdditionalNotesData(e.target.value)} className={textAreaClassName} />
                        </div>
                        <SheetFooter>
                            <div className='flex items-center justify-end space-x-2 w-full'>
                                <SheetClose
                                    asChild>
                                    <DropdownMenuItem
                                        className='p-0'>
                                        <Button
                                            type='submit'
                                        >
                                            Save Credential
                                        </Button>
                                    </DropdownMenuItem>
                                </SheetClose>
                                <SheetClose 
                                    asChild
                                >
                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            className={alertDialogTriggerClassName}
                                        >
                                            Delete
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the credential.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel
                                                >
                                                    Cancel
                                                </AlertDialogCancel>
                                                    <DropdownMenuItem
                                                        ref={ref}
                                                        className='p-0 hidden'
                                                        >
                                                    </DropdownMenuItem>
                                                    <Button
                                                        onClick={(e) => {
                                                            deleteRow(e)
                                                            ref.current.click()
                                                        }}
                                                    >
                                                        Continue
                                                    </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </SheetClose>
                            </div>
                        </SheetFooter>
                    </form>
                </div>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default EditCredentialForm