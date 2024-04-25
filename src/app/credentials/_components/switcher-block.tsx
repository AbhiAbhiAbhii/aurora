'use client'
import { 
    Tabs, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import AuroraText from "@/components/global/aurora-text"
import { useGlobalContext } from "@/components/global/my-global-context"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { 
    Sheet, 
    SheetClose, 
    SheetContent, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { getAuthUsers, getUserDetails } from "@/lib/queries"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

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

const SwitcherBlock = (props: Props) => {

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

    const { setTabValue, value, setAlertTitle, setAlertDescription } = useGlobalContext()
    const [ users, setUsers ] = useState<any>([]) 
    const [ authUser, setAuthUser ] = useState<any>()
    const [ detectRole, setDetectRole ] = useState<any>()
    const form = useForm<z.infer<typeof AddCredentialsFormSchema>>({
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

    const successNotification = () => {
        let alertContainer = document.querySelector('.alert')
        alertContainer?.classList.add('alert-active')
        setAlertTitle('Success')
        setAlertDescription('Your credential is added successfully')
        setTimeout(() => {
            alertContainer?.classList.remove('alert-active')
        }, 2000)
        setTimeout(() => {
            location.reload()
        }, 3000)
    }

    const notSuccessNotification = () => {
        let alertContainer = document.querySelector('.alert')
        alertContainer?.classList.add('alert-active')
        setTimeout(() => {
            alertContainer?.classList.remove('alert-active')
        }, 2000)
        setAlertTitle('Not Success')
        setAlertDescription('Something went WONG')  
    }

    const addCredentialSubmit = async (values: z.infer<typeof AddCredentialsFormSchema>) => {
       const {  social, service_name, user_name, password, url, additional_notes, managedby } = values
        try {
            const supabase = createClient()
            const res = await supabase.from("Service").insert({
                company_name: value, 
                type: social, 
                service_name: service_name, 
                user_name: user_name, 
                password: password, 
                URL: url, 
                additional_notes: additional_notes,
                managed_by: managedby
            }) 
            if(res.error) {
                notSuccessNotification()
            } else {
                successNotification()
            }
            
        } catch(error) {
            console.log(error, "Something went WONG")
        }
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
        <div>
            <AuroraText 
                text="Credentials"
                className="font-inter font-semibold text-3xl tracking-[-0.02em] mb-4"
            />
            <div className="flex items-center justify-between mb-4">
                <Tabs defaultValue={tabs[0].tab}>
                    <TabsList>
                        {
                            tabs.map((item) => (
                                <TabsTrigger 
                                    value={item.tab}
                                    key={item.tab}
                                    className="font-inter font-medium text-sm text-muted-foreground"
                                    onClick={(e) => setTabValue(e.currentTarget.innerText)}
                                >
                                    {item.tab}
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                </Tabs>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button 
                            className="flex items-center"
                        >
                            <Plus 
                                className="mr-4"
                                size={16}
                            />
                            Add Credentials
                        </Button>
                    </SheetTrigger>
                    <SheetContent 
                        className="w-[80%] min-w-[500px] overflow-y-scroll"
                    >
                        <div className="w-[380px] min-w-[80%] ml-4">
                            <SheetHeader className="mt-8">
                                <SheetTitle 
                                    className="font-geist font-medium text-2xl text-foreground"
                                >
                                    Add New Credential
                                </SheetTitle>
                            </SheetHeader>
                            <div 
                                className="mt-4"
                            >
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(addCredentialSubmit)}>
                                        <FormField 
                                            control={form.control}
                                            name="social"
                                            render={({ field }) => (
                                                <FormItem 
                                                    className="mb-4"
                                                >
                                                    <FormLabel>
                                                        What type of credential is this?
                                                    </FormLabel>
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
                                            control={form.control}
                                            name="service_name"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="mb-4"
                                                >
                                                    <FormLabel>
                                                        Service Name
                                                    </FormLabel>
                                                    <Input placeholder="" {...field} />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="user_name"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="mb-4"
                                                >
                                                    <FormLabel>
                                                        Username
                                                    </FormLabel>
                                                    <Input 
                                                        placeholder=""
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="mb-4"
                                                >
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <Input 
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="url"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="mb-4"
                                                >
                                                    <FormLabel>
                                                        URL
                                                    </FormLabel>
                                                    <Input 
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="managedby"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="mb-4"
                                                >
                                                    <FormLabel>
                                                        Managed by
                                                    </FormLabel>
                                                    <Select
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
                                            control={form.control}
                                            name="additional_notes"
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
                                                    className="bg-zinc-100 text-zinc-950 transition-all hover:opacity-75 hover:bg-zinc-100"
                                                    onClick={() => console.log("Cancel")}
                                                >
                                                    Cancel
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default SwitcherBlock