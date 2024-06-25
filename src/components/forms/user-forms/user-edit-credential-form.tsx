import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { 
    Sheet, 
    SheetClose, 
    SheetContent, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from '@/components/ui/sheet'

import { 
    AlertDialog, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from '../../ui/alert-dialog'
import SelectArrowIcon from '@/app/credentials/_components/select-arrow-icon'
import { Button } from '@/components/ui/button'

import { tabs } from '@/utils/types'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { alertDialogTriggerClassName, inputClassName, labelClassName, selectCustomClassName, textAreaClassName } from '@/utils/classnames'
import { EyeNoneIcon } from '@radix-ui/react-icons'
import { Checkbox } from '@/components/ui/checkbox'
import { useGlobalContext } from '@/components/global/my-global-context'
import { getCurrentDate } from '@/utils/functions/date'
import { getAlertContainer } from '@/utils/functions/alert-function'
import { reloadPage } from '@/utils/functions/reload'

type Props = {
    serviceRowData: any
}


const UserEditCredentialForm = ({ serviceRowData }: Props) => {

    const { currentSessionUser, setAlertTitle, setAlertDescription } = useGlobalContext()
    const { name, email} = currentSessionUser[0]
    const { service_name, client_name, password, shared_to_workspace, type, url, user_name, additional_notes, id } = serviceRowData
    
    const ref: any = useRef()
    const closeRef: any = useRef()
    const [ buttonSelectClick, setButtonSelectClick ] = useState<boolean>(false)
    const [ clientSelectClick, setClientSelectClick ] = useState<boolean>(false)
    const [ togglePassClick, setTogglePassClick ] = useState<boolean>(false)

    const [ typeData, setTypeData ] = useState<string>("")
    const [ serviceNameData, setServiceNameData ] = useState<string>("")
    const [ userNameData, setUserNameData ] = useState<string>("")
    const [ passwordData, setPasswordData ] = useState<string>("")
    const [ urlData, setUrlData ] = useState<string>("")
    const [ additionalNotesData, setAdditionalNotesData ] = useState<string>("")

    const [ clientNameArray, setClientNameArray ] = useState<any>("")
    const [ clientNameData, setClientNameData ] = useState<string>("")
    const [ workSpaceData, setWorkSpaceData ] = useState<boolean>()

    useEffect(() => {
        async function fetchAllClients(){
            const URL = '/api/NewClientName'

            const res = await fetch(URL)
            if(!res.ok) {
                console.log("Error fetching clients")
            } else {
                let { data } = await res.json()
                setClientNameArray(() => data)
            }
        }
        fetchAllClients()
    }, [])

    useEffect(() => {
        setServiceNameData(() => service_name)
        setClientNameData(() => client_name)
        setUserNameData(() => user_name)
        setTypeData(() => type)
        setPasswordData(() => password)
        setUrlData(() => url)
        setAdditionalNotesData(() => additional_notes)
        setWorkSpaceData(() => shared_to_workspace)
    }, [serviceRowData])

    const messageFunction = (title: string, description: string) => {
        getAlertContainer()
        setAlertTitle(title)
        setAlertDescription(description)
    }

    const updateSuccess = () => {
        messageFunction("Item Updated", "Your credential has been updated successfully")
        setTimeout(() => reloadPage(), 1500)
    }

    const updateError = () => {
        messageFunction("Update error", 'Error updating credential')
    }

    const deleteSuccess = () => {
        messageFunction("Item Deleted", "Your selected credential were deleted")
        setTimeout(() => reloadPage(), 1500)
    }
    const deleteError = () => {
        messageFunction("Error deleting", "Your selected credential were not deleted")
        setTimeout(() => reloadPage(), 1500)
    }

    async function editCredentialItemSubmit(e: any) {
        e.preventDefault()

        const editURL = "/api/UserCredential/Edit/EditLog"
        const URl = '/api/UserCredential/Edit'
        const editCreatedAtLogURL = '/api/UserCredential/Edit/EditCreatedAtServiceName'
        const { dateString, timeString } = getCurrentDate()

        const formData = {
            id,
            serviceNameData,
            clientNameData,
            userNameData,
            typeData,
            passwordData,
            urlData,
            additionalNotesData,
            workSpaceData
        }

        const res = await fetch(URl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!res.ok) {
            console.log("Error updating")
            // not success error handling
            closeRef.current.click()
            setTimeout(() => updateError(), 800)
        } else {

        console.log("Success updating data")
        
        // To reflect in the edit log, which key values have been edited
        // Compare two object keys and the value for any difference
        
        // Object A
        const initObject: any= {
            type: type,
            clientname: client_name,
            servicename: service_name,
            username: user_name,
            password: password,
            URL: url,
            workspace: shared_to_workspace,
            additionalnotes: additional_notes,
        }
        
        // Object B
        const updatedObject: any = {
            type: typeData,
            clientname: clientNameData,
            servicename: serviceNameData,
            username: userNameData,
            password: passwordData,
            URL: urlData,
            workspace: workSpaceData,
            additionalnotes: additionalNotesData
        }
        
        let differentKeys = [] // push any different values to this array
        let itemsEdited: any
        
        // Get the object keys of both object
        const initObjectKeys = Object.keys(initObject) 
        const updatedObjectKeys = Object.keys(updatedObject)
        
        if(initObjectKeys.length !== updatedObjectKeys.length) {
            console.log("Error, object lengths are not equal")
        } else {
            for(let key of initObjectKeys) {
                if(initObject[key] !== updatedObject[key]) {
                    differentKeys.push(key)
                    itemsEdited = `Credential fields ${differentKeys.join(", ")} edited`
                } 
            }
            const editLogData = {
                name,
                email,
                dateString,
                timeString,
                itemsEdited,
                serviceNameData,
            }
            const res = await fetch(editURL, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(editLogData)
            })
            
            if(!res.ok) {
                console.log("Error inserting into edit log")
            } else {
                console.log("Success inserting edit log")
                // Check if service name has been changed to update the Created_at log
                let prevServiceName: any = service_name
                
                if(serviceNameData !== service_name) {
                    const res = await fetch(editCreatedAtLogURL, {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({serviceNameData, prevServiceName})
                    })
                    
                    if(!res.ok) {
                        console.log("Error updating created at log")
                    } else {
                        closeRef.current.click()
                        setTimeout(() => updateSuccess(), 500)
                        console.log("Success updating created at log")
                    }
                } else {
                    closeRef.current.click()
                    setTimeout(() => updateSuccess(), 500)
                }
            }
        }
    }
}

    const handleButtonSelectClick = (e:any) => {
        e.preventDefault()
        setButtonSelectClick((prevState) => !prevState)
    } 

    const handleClientSelectClick = (e:any) => {
        e.preventDefault()
        setClientSelectClick((prevState) => !prevState)
    }

    const deleteRow = async (e:any) => {
        e.preventDefault()

        const delURL = '/api/UserCredential/Delete/DeleteRow'
        console.log(id, "hello")
        const res = await fetch(delURL, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        if(!res.ok) {
            console.log("Network response is not okay")
        } else {
            console.log("Network response is okay")
            setTimeout(() => deleteSuccess(), 800)
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
            <div className='mt-4'>
            <form 
                onSubmit={editCredentialItemSubmit}
            >
                {/* Client Name */}
                <div
                    className='flex flex-col space-y-2 mb-4'
                >
                    <label
                        className={labelClassName}
                    >
                        Name of this client
                    </label>
                    <button
                        onClick={handleClientSelectClick}
                        className={selectCustomClassName}
                    >
                        <span style={{pointerEvents: 'none'}}>{clientNameData}</span>
                        <SelectArrowIcon />
                        { clientSelectClick && <div
                            className={`select-custom-box-activate border bg-white rounded-md z-50`}
                        >
                            <div className='font-semibold flex py-[0.45rem] items-start text-sm pointer-events-none cursor-default'>
                                <p className='ml-7'>
                                    Client Names
                                </p>
                            </div>
                            <div>
                                {
                                    clientNameArray.map((item: any) => (
                                        <div
                                            onClick={(e:any) => setClientNameData(e.target.outerText)}
                                            key={item.client_name} 
                                            className='flex py-[0.45rem] items-start text-sm hover:bg-[#F5F5F4] transition rounded-md'
                                        >
                                            <p className='ml-7'>
                                                {item.client_name}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>}
                    </button>
                </div>
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
                                setServiceNameData(() => e.target.value)
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

                    {/* WorkSpace Data */}
                    <div className='flex flex-col space-y-2 my-9'>
                        <div
                            className='flex items-center space-x-2'
                        >
                            <Checkbox 
                                checked={workSpaceData}
                                onCheckedChange={() => setWorkSpaceData((prevState) => !prevState)}
                            />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                            Share to workspace
                        </label>
                        </div>
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
                                ref={closeRef}
                                asChild>
                                <DropdownMenuItem
                                    className='p-0'>
                                    <Button
                                        // type='submit'
                                        onClick={editCredentialItemSubmit}
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

export default UserEditCredentialForm