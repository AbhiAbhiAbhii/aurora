import { useGlobalContext } from '@/components/global/my-global-context'
import { Button } from '@/components/ui/button'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { inputClassName, labelClassName } from '@/utils/classnames'
import { getAlertContainer } from '@/utils/functions/alert-function'
import React, { useRef, useState } from 'react'

type Props = {}

const AddTeamMemberForm = (props: Props) => {

    const ref: any = useRef()

    const { currentSessionUser, setAlertTitle, setAlertDescription } = useGlobalContext()
    const [ mailValue, setMailValue ] = useState<string>("")
    const { email } = currentSessionUser[0]
    let teamLeadMail: string = email

    const messageFunction = (title: string, description: string) => {
        getAlertContainer()
        setAlertTitle(title)
        setAlertDescription(description)
    }

    const updateMessage = (title: any, description: any) => {
        messageFunction(title, description)
    }

    const handleAddTeamMemberSubmit = async (e:any) => {
        e.preventDefault()
        const res = await fetch('/api/UserCredential/AddTeamMember', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({mailValue, teamLeadMail})
        })

        const { title, message } = await res.json()

        if(!res.ok) {
            console.log("Network response is not okay")
            updateMessage(title, message)
        } else {
            updateMessage(title, message)
            console.log("Network response is okay")
        }
    }

    return (
        <form 
            className='space-y-4'
        >
            <div className='space-y-2'>
                <label className={labelClassName}>
                    Email
                </label>
                <input 
                    type="text" 
                    className={inputClassName}
                    onChange={(e) => setMailValue(() => e.target.value)} 
                />
            </div>
            <SheetFooter>
                <SheetClose className='hidden' ref={ref} />
                <Button
                    className='w-[66%] !ml-0'
                    onClick={handleAddTeamMemberSubmit}
                >
                    Add User
                </Button>
                <SheetClose
                    className='w-[34%] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2'
                >
                    Close
                </SheetClose>
            </SheetFooter>
        </form>
    )
}

export default AddTeamMemberForm