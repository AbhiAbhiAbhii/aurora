'use client'
import { 
    Tabs, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import AuroraText from "@/components/global/aurora-text"
import { useGlobalContext } from "@/components/global/my-global-context"
import { Button } from "@/components/ui/button"
import { LucideSparkles, Plus } from "lucide-react"
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { getAuthUsers, getClients, getCurrentUserAllDetail, getUserDetails, insertCreatedAtLog } from "@/lib/queries"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { EyeNoneIcon } from "@radix-ui/react-icons"
import { getAlertContainer } from "@/utils/functions/alert-function"
import { reloadPage } from "@/utils/functions/reload"
import { getCurrentDate } from "@/utils/functions/date"
import UserAddCredentialForm from "@/components/forms/user-forms/user-add-credential-form"

type Props = {}

interface TabValue {
    tab: string
}

const SwitcherBlock = (props: Props) => {

    const clickRef: any = useRef();
    const { setTabValue, value, setAlertTitle, setAlertDescription, isGodCheck, currentSessionUser } = useGlobalContext()
    const [ users, setUsers ] = useState<any>([]) 
    const [ togglePassClick, setTogglePassClick ] = useState<boolean>(false)
    const [ isSSO, setIsSSO ] = useState<any>(false)
    const [ ssoName, setSsoName ] = useState<string>("")
    const [ clientsArray, setClientsArray ] = useState(null)

    const [ currentUser, setCurrentUser ] = useState<any>()

    const tabs: TabValue[] = 
    isGodCheck ?
    [{tab: 'All'},{tab: 'Operations'},{tab: 'Socials'},{tab: 'Subscriptions'}]
    :
    [{tab: 'All'},{tab: 'Operations'},{tab: 'Socials'},{tab: 'Subscriptions'}, {tab: 'Shared'}]

    const AddCredentialsFormSchema = z.object({
        managedby: z.string().min(1, { message: 'Select a field'}),
        social: z.string().min(1, { message: "Select the type field" }),
        service_name: z.string().min(1, { message: "Enter Service Name" }),
        user_name: z.string().min(1, { message: 'Enter User Name' }),
        login_type: 
            isSSO ?
            z.string()
            :
            z.string().min(1, { message: "Select a field" }),
        password: 
            isSSO ?
            z.string()
            :
            z.string().min(5, { message: "Must be 5 characters or more" })
        ,
        url: z.string().min(1, { message: 'The url field is required'}),
        additional_notes: z.string()
    })

    const form = useForm<z.infer<typeof AddCredentialsFormSchema>>({
        resolver: zodResolver(AddCredentialsFormSchema),
        defaultValues: {
            managedby: "",
            social: "",
            service_name: "",
            user_name: "",
            login_type: "",
            password: "",
            url: "",
            additional_notes: ""
        }
    })

    const messageFunction = (title: string, description: string) => {
        getAlertContainer()
        setAlertTitle(title)
        setAlertDescription(description)
    }


    const successNotification = () => {
        messageFunction('Success', 'Your credential is added successfully')
        setTimeout(() => reloadPage(), 1500)
    }

    const notSuccessNotification = () => {
        messageFunction("Not Success", "Something went WONG")
    }

    function detectCheckBox() {
        setIsSSO((prevValue:any) => !prevValue)
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            setUsers(await getUserDetails())
        }
        fetchUserDetails()
    }, [])

    useEffect(() => {
        async function fetchCurrentUser() {
            let data: any = await getCurrentUserAllDetail()
            setCurrentUser(() => data.data[0])
        }
        fetchCurrentUser()
    }, [])


    useEffect(() => {
        async function fetchClients() {
            if(currentSessionUser[0].is_team_lead) {
                let data: any = await getClients()
                setClientsArray(() => data)
            } else {
                setClientsArray(() => null)
            }
        }
        fetchClients()
    }, [])

    const addCredentialSubmit = async (values: z.infer<typeof AddCredentialsFormSchema>) => {

        const {  social, service_name, user_name, password, url, additional_notes, managedby, login_type } = values
        const { name, email } = currentUser  

        const { dateString, timeString } = getCurrentDate()

       if(isSSO) {
        const supabase = createClient()
        if(ssoName.toLowerCase() === "google") {
            const { data, error } = await supabase.from("Service").select('password').eq('user_name', user_name).eq('login_type', 'Gmail')
            if(error) {
                console.log("Could not find rowData")
                alert("Could not find rowData")
            } else {
                let extractedPassword:string = data[0].password
                const formData = {
                    value, 
                    social, 
                    service_name, 
                    user_name, 
                    extractedPassword, 
                    url, 
                    additional_notes, 
                    managedby, 
                    isSSO, 
                    ssoName, 
                    login_type
                }
                const res = await fetch("/api/AddCredential", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                if(res.ok) {
                    clickRef.current.click()
                    successNotification()
                    await insertCreatedAtLog(name, email, dateString, timeString, service_name)
               
                } else {
                    clickRef.current.click()
                    notSuccessNotification()
                }
            }
        } else {
            null
        }
       } else {
        const formData = {
            value, 
            social, 
            service_name, 
            user_name, 
            password, 
            url, 
            additional_notes, 
            managedby, 
            isSSO, 
            ssoName, 
            login_type
        }

        const res = await fetch("/api/AddCredential", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(res.ok) {
            clickRef.current.click()
            successNotification()
            await insertCreatedAtLog(name, email, dateString, timeString, service_name)
        } else {
            notSuccessNotification()
        }

       }
    }

   let inactiveCheckBox = <button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground !mt-0"></button>
   let activeCheckBox = <button type="button" role="checkbox" aria-checked="true" data-state="checked" value="on" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground !mt-0"><span data-state="checked" className="flex items-center justify-center text-current" style={{pointerEvents: 'none'}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check h-4 w-4"><path d="M20 6 9 17l-5-5"></path></svg></span></button>

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
                                    {
                                        item.tab === "Shared" ?
                                        <div
                                            className="flex items-center justify-center space-x-1"
                                        >
                                            <LucideSparkles 
                                                size={16}
                                            />
                                            <p>
                                                {item.tab}
                                            </p>
                                        </div>
                                        :
                                        item.tab
                                    }
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
                                {
                                    isGodCheck ?
                                    (
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
                                                <div
                                                    className="space-y-2 mb-6 mt-6 flex items-center"
                                                >
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Is it a SSO(Single sign-on)?
                                                    </label>
                                                        <div
                                                            className="flex items-center justify-center !m-0 !ml-2"
                                                            onClick={detectCheckBox}
                                                        >
                                                            {
                                                                isSSO ?
                                                                activeCheckBox
                                                                :
                                                                inactiveCheckBox
                                                            }
                                                        </div>
                                                </div>
                                                {
                                                    isSSO ?
                                                    (
                                                        <div
                                                            className="space-y-2 mb-4 flex flex-col"
                                                        >
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
                                                            >
                                                                Which Service?
                                                            </label>
                                                            <input 
                                                                onChange={(e) => {
                                                                    setSsoName(() => {
                                                                        let inputValue = e.target.value
                                                                        return inputValue
                                                                    })
                                                                }}
                                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                placeholder="Enter Service Name"
                                                            />
                                                        </div>
                                                    )
                                                    :
                                                    <>
                                                    <FormField 
                                                        control={form.control}
                                                        name="login_type"
                                                        render={({ field }) => (
                                                            <FormItem
                                                                className="mb-4"
                                                            >
                                                                <FormLabel>
                                                                    Login type
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Select
                                                                        onValueChange={field.onChange}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue 
                                                                                className="text-black"
                                                                                placeholder={""}
                                                                            />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel>Types</SelectLabel>
                                                                                {
                                                                                    ['Gmail', 'Other'].map((item, index) => (
                                                                                        <SelectItem value={item} key={index}>{item}</SelectItem>
                                                                                    ))
                                                                                }                                                          
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
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
                                                                <div className="w-full relative">
                                                                    <Input 
                                                                        type={
                                                                            togglePassClick ?
                                                                            "text"
                                                                            :
                                                                            "password"
                                                                        }
                                                                        {...field}
                                                                    />
                                                                    <div
                                                                        onClick={() => setTogglePassClick(!togglePassClick)}
                                                                        className="absolute top-0 right-0 flex items-center justify-center h-full w-9 border-0 border-l cursor-pointer"
                                                                    >
                                                                        <EyeNoneIcon />
                                                                    </div>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    </>
                                                }
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
                                                                            placeholder={""}
                                                                        />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Users</SelectLabel>
                                                                        {
                                                                            users.map((item:any, index:number) => (
                                                                                <SelectItem value={item.user_name} key={index}>{item.user_name}</SelectItem>
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
                                                        <Button
                                                            type="submit"
                                                        >
                                                            Save Credential
                                                        </Button>
                                                    <SheetClose
                                                        className="hidden"
                                                        ref={clickRef} 
                                                    >
                                                        Close me
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
                                    )
                                    :
                                    (<UserAddCredentialForm tabs={tabs} clientsArray={clientsArray} currentSessionUser={currentSessionUser} />)
                                }
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default SwitcherBlock