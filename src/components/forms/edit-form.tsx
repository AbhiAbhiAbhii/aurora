'use client'
import React, { useEffect, useState } from 'react'
import { 
    FormField, 
    FormItem
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { 
    Sheet, 
    SheetClose, 
    SheetContent, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Form, useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { getAuthUsers, getUserDetails } from '@/lib/queries'
import { useGlobalContext } from '../global/my-global-context'


type Props = {}

interface TabValue {
    tab: string
}

const AddCredentialsFormSchema = z.object({
    managedby: z.string(),
    social: z.string(),
    service_name: z.string().min(1, { message: "Enter Service Name" }),
    user_name: z.string().min(1, { message: 'Enter User Name' }),
    password: z.string().min(5, { message: "Must be 5 characters or more" }),
    url: z.string(),
    additional_notes: z.string()
})

const EditForm = (props: Props) => {

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
    const { setAlertTitle, setAlertDescription } = useGlobalContext()
    const [ users, setUsers ] = useState<any>([]) 
    const [ authUser, setAuthUser ] = useState<any>()
    const [ detectRole, setDetectRole ] = useState<any>()
  
    const formB = useForm<z.infer<typeof AddCredentialsFormSchema>>({
        resolver: zodResolver(AddCredentialsFormSchema),
        defaultValues: {
            managedby: "",
            social: "",
            service_name: "",
            user_name: "",
            password: "",
            url: "",
            additional_notes: ""
        }
    })

    async function EditCredentialItem() {  
        console.log("asdasdjhak")
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
            className="w-[80%] min-w-[500px]"
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
                    <Form {...formB}>
                        <form onSubmit={formB.handleSubmit(EditCredentialItem)}>
                            <FormField 
                                name='social'
                                control={formB.control}
                                render={({field}) => (
                                    <FormItem 
                                        className='mb-4'
                                    >
                                        <label>What type of credential is this?</label>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    placeholder="Select type"
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Types of Credential</SelectLabel>
                                                    {
                                                        tabs.slice(1).map((item, index) => (
                                                            <SelectItem value={item.tab} key={index}>{item.tab}</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name='service_name'
                                control={formB.control}
                                render={({ field }) => (
                                    <FormItem
                                        className='mb-4'
                                    >
                                        <label>Service Name</label>
                                        <Input placeholder='' {...field}/>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={formB.control}
                                name="user_name"
                                render={({ field }) => (
                                    <FormItem
                                        className="mb-4"
                                    >
                                        <label>
                                            Username
                                        </label>
                                        <Input 
                                            placeholder=""
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={formB.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem
                                        className="mb-4"
                                    >
                                        <label>
                                            Password
                                        </label>
                                        <Input 
                                            type="password"
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={formB.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem
                                        className="mb-4"
                                    >
                                        <label>
                                            URL
                                        </label>
                                        <Input 
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={formB.control}
                                name="managedby"
                                render={({ field }) => (
                                    <FormItem
                                        className="mb-4"
                                    >
                                        <label>
                                            Managed by
                                        </label>
                                        <Select
                                            // defaultValue={"testing"}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                    <SelectValue 
                                                        className="text-black"
                                                        placeholder={
                                                            users.filter((item:any) => item.email === authUser.user.email).map((filterValue:any) => {
                                                                setDetectRole(filterValue)
                                                                return filterValue.user_name
                                                            })
                                                        }
                                                    />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Users</SelectLabel>
                                                    {
                                                        detectRole.is_god === true ?
                                                            users.map((item:any, index:number) => (
                                                                <SelectItem value={item.user_name} key={index}>{item.user_name}</SelectItem>
                                                            )) 
                                                            :
                                                            <SelectItem value={detectRole.user_name}>{detectRole.user_name}</SelectItem>
                                                    }                                                                
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={formB.control}
                                name="additional_notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <label>Additional Notes</label>
                                        <Textarea 
                                            {...field}
                                            className="resize-none"
                                        />
                                    </FormItem>
                                )}
                            />
                            <SheetFooter className="mt-10">
                                <SheetClose asChild>
                                    <Button
                                        type="submit"
                                    >
                                        Save Credential
                                    </Button>
                                </SheetClose>
                                <SheetClose>
                                    <Button
                                        className='bg-[#631F0A] text-white'
                                        variant={'destructive'}
                                        onClick={() => console.log("Cancel")}
                                    >
                                        Delete
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </Form>
                </div>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default EditForm