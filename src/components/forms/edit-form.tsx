'use client'
import React, { useEffect, useState } from 'react'
import { 
    Sheet, 
    SheetClose, 
    SheetContent, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from '@/components/ui/sheet'
import { deleteRowItem, getAuthUsers, getServiceRowDetails, getUserDetails, updateItem } from '@/lib/queries'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import SelectArrowIcon from '@/app/credentials/_components/select-arrow-icon'
import { useGlobalContext } from '../global/my-global-context'


type Props = {
    rowServicenameData: string
    serviceRowData: any
}

interface TabValue {
    tab: string
}

const EditForm = ({rowServicenameData, serviceRowData}: Props) => {

    
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
    let inputClassName: string = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    let selectCustomClassName: string = "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 relative"
    let textAreaClassName: string = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
    
    const { setAlertDescription, setAlertTitle } = useGlobalContext()
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


    const updateSuccess = () => {
        let alertContainer = document.querySelector('.alert')
        alertContainer?.classList.add('alert-active')
        setAlertTitle('Item Updated')
        setAlertDescription('Your credential has been updated successfully')
        setTimeout(() => {
            alertContainer?.classList.remove('alert-active')
        }, 2000)
        setTimeout(() => {
            location.reload()
        }, 3000)
    }

    const deleteSuccess = () => {
        let alertContainer = document.querySelector('.alert')
        alertContainer?.classList.add('alert-active')
        setAlertTitle('Item Deleted')
        setAlertDescription('Your selected credential were deleted')
        setTimeout(() => {
            alertContainer?.classList.remove('alert-active')
        }, 2000)
        setTimeout(() => {
            location.reload()
        }, 3000)
    }

    const editCredentialItemSubmit = async (e:any) => {
        e.preventDefault()
        await updateItem(
            serviceRowData.id,
            serviceRowData.company_name,
            serviceNameData,
            passwordData,
            typeData,
            userNameData,
            urlData,
            additionalNotesData,
            managedbyData
        )
        updateSuccess()
    }

    const deleteRow = async (e: any) => {
        e.preventDefault()
        await deleteRowItem(serviceRowData.id)
        deleteSuccess()
    }

    const handleButtonSelectClick = (e:any) => {
        setButtonSelectClick(!buttonSelectClick)
        e.preventDefault()
    } 

    const handleManagedButtonClick = (e:any) => {
        setButtonManagedSelectClick(!buttonManagedSelectClick)
        e.preventDefault()
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
        setUrlData(serviceRowData.URL)
        setManagedbyData(serviceRowData.managed_by)
        setAdditionalNotesData(serviceRowData.additional_notes)
    }, [
        serviceRowData.service_name, 
        serviceRowData.type, 
        serviceRowData.user_name, 
        serviceRowData.password, 
        serviceRowData.URL, 
        serviceRowData.managed_by, 
        serviceRowData.additional_notes
    ])


  return (
    <Sheet>
        <SheetTrigger asChild>
            <div role="menuitem" 
                className="relative flex cursor-default select-none items-center
                    justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
                    focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"  
                data-orientation="vertical" data-radix-collection-item=""
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
                    <form onSubmit={editCredentialItemSubmit}>
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
                                                    key={item.tab} className='flex py-[0.45rem] items-start text-sm hover:bg-[#F5F5F4] transition rounded-md'>
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
                                    setServiceNameData(e.target.value)
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
                        {/* Password*/}
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className={labelClassName}>
                                Password
                            </label>
                            <input
                                value={passwordData}
                                onChange={(e) => setPasswordData(e.target.value)}
                                name='password' 
                                className={inputClassName}
                                type="text" 
                            />
                        </div>
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
                            <button
                                onClick={handleManagedButtonClick}
                                className={selectCustomClassName}
                            >
                                <span style={{pointerEvents: 'none'}}>{managedbyData}</span>
                                <SelectArrowIcon />
                                { buttonManagedSelectClick && <div
                                    className={`select-custom-box-activate border bg-white rounded-md`}
                                >
                                    <div className='font-semibold flex py-[0.45rem] items-start text-sm pointer-events-none cursor-default'>
                                        <p className='ml-7'>
                                            Users
                                        </p>
                                    </div>
                                    <div>
                                        {
                                            detectRole.is_god === true ?
                                                users.map((item:any, index:number) => (
                                                    <div onClick={(e:any) => setManagedbyData(e.target.outerText)} 
                                                        className='flex py-[0.45rem] items-start text-sm hover:bg-[#F5F5F4] transition rounded-md' key={index}>
                                                        <p className='ml-7'>
                                                            {item.user_name}
                                                        </p>
                                                    </div>
                                                )) 
                                                :
                                                <div onClick={(e:any) => setManagedbyData(e.target.outerText)} className='flex py-[0.45rem] items-start text-sm hover:bg-[#F5F5F4] transition rounded-md'>
                                                    <p className='ml-7'>
                                                        {detectRole.user_name}
                                                    </p>
                                                </div>
                                        }   
                                    </div>
                                </div>}
                            </button>
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
                                    <DropdownMenuItem className='p-0'>
                                        <Button type='submit'>
                                            Save Credential
                                        </Button>
                                    </DropdownMenuItem>
                                </SheetClose>
                                <SheetClose 
                                    asChild
                                >
                                    <DropdownMenuItem className='p-0'>
                                        <Button
                                            variant={'destructive'}
                                            className='bg-[#631F0A] text-zinc-50'
                                            onClick={deleteRow}
                                        >
                                            Delete
                                        </Button>
                                    </DropdownMenuItem>
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

export default EditForm