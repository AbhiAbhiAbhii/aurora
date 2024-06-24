'use client'
import React, { MutableRefObject, useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { EyeNoneIcon } from '@radix-ui/react-icons'
import { Textarea } from '../ui/textarea'
import { SheetClose, SheetFooter } from '../ui/sheet'
import { Button } from '../ui/button'
import { SignUpTeam } from '@/app/login/signup-test'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { useGlobalContext } from '../global/my-global-context'
import { getAlertContainer } from '@/utils/functions/alert-function'
import { reloadPage } from '@/utils/functions/reload'

type Props = {}

const AddNewMemberFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(1, { message: 'This field is required ' }),
    password: z.string().min(5, { message: 'Must be 5 characters or more' }),
    additionalNotes: z.string(),
    role: z.string(),
    isLead: z.boolean()
})

const AddTeamForm = (props: Props) => {

    const form = useForm<z.infer<typeof AddNewMemberFormSchema>>({
        resolver: zodResolver(AddNewMemberFormSchema),
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            additionalNotes: '',
            role: '',
            isLead: false
        }
    })

    const { currentSessionUser, setAlertTitle, setAlertDescription } = useGlobalContext()
    const { is_team_lead } = currentSessionUser[0]
    const [ togglePassClick, setTogglePassClick ] = useState<boolean>(false)
    const ref:MutableRefObject<any> = useRef()

    const messageFunction = (title: string, description: string) => {
        getAlertContainer()
        setAlertTitle(title)
        setAlertDescription(description)
    }

    const updateMessage = (title: any, description: any) => {
        messageFunction(title, description)
    }

    
    async function handleAddNewTeamSubmit(values: z.infer<typeof AddNewMemberFormSchema>) {
        const { name, email, username, password, additionalNotes, role, isLead } = values
        let userStatus

        const addTeamData = {
            name,
            email,
            username,
            password,
            additionalNotes,
            userStatus,
            isLead
        }

        if(role === "God") {
            userStatus = true
        } else if(is_team_lead){
            userStatus = false
        } else {
            userStatus = false
        }
        const teamLeadMail = ''
        const URL = "/api/AddUser"
        try {
            // SignUpTeam(name, password, email, username, additionalNotes, role, isLead)
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ name, email, username, password, additionalNotes, userStatus, isLead, teamLeadMail }) 
            })
            ref.current.click()
            if(!res.ok) {
                let { message } = await res.json()
                console.log(message, "Error")
            } else {
                const { message, title } = await res.json()
                updateMessage(title, message)
            }
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleAddNewTeamSubmit)}
            className='space-y-4'
        >
            <FormField 
                control={form.control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input 
                                {...field}
                                placeholder='name'
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input 
                                {...field}
                                placeholder='Email'
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name='username'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input 
                                {...field}
                                placeholder='Username'
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <div className='w-full relative'>
                            <FormControl className="w-full">
                                <Input 
                                    type={
                                        togglePassClick ?
                                        "text"
                                        :
                                        "password"
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <div 
                                onClick={() => setTogglePassClick((prevValue) => !prevValue)}
                                className="absolute top-0 right-0 flex items-center justify-center h-full w-9 border-0 border-l cursor-pointer"
                            >
                                <EyeNoneIcon />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
            {/* Role */}
            <FormField 
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem 
                        className={`mb-4 ${is_team_lead ? 'hidden': null}`}
                    >
                        <FormLabel>
                            Role of this user
                        </FormLabel>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                                <SelectValue 
                                    placeholder="Select Role"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Types of Roles</SelectLabel>
                                    {
                                        ['God', 'User'].map((item: any) => <SelectItem value={item} key={item}>{item}</SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
            />
            {/* Is Lead */}
            <FormField 
                control={form.control}
                name="isLead"
                render={({ field }) => (
                    <FormItem 
                        className={`space-x-2 mb-6 mt-6 flex items-center ${is_team_lead ? 'hidden' : null}`}
                    >
                        <FormLabel className='mt-2'>
                            Team leader?
                        </FormLabel>
                        <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <Textarea 
                            {...field}
                            className="resize-none"
                        />
                    </FormItem>
                )}
            />
            <SheetFooter>
                <SheetClose className='hidden' ref={ref} />
                <Button
                    className='w-[66%] !ml-0'
                    type='submit'
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
    </Form>
  )
}

export default AddTeamForm