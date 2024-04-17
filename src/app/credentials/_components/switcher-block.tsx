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
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type Props = {}

interface TabValue {
    tab: string
}

const AddCredentialsFormSchema = z.object({
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

    const { setTabValue } = useGlobalContext()
    const form = useForm<z.infer<typeof AddCredentialsFormSchema>>({
        resolver: zodResolver(AddCredentialsFormSchema),
        defaultValues: {
            social: "",
            service_name: "",
            user_name: "",
            password: "",
            url: "",
            additional_notes: ""
        }
    })

    const addCredentialSubmit = async (values: z.infer<typeof AddCredentialsFormSchema>) => {
        const { social, service_name, user_name, password, url, additional_notes } = values
    }

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
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle 
                                className="font-geist text-2xl text-foreground"
                            >
                                Add New Credential
                            </SheetTitle>
                        </SheetHeader>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(addCredentialSubmit)}>
                                    <FormField 
                                        control={form.control}
                                        name="social"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    What type of credential is this?
                                                </FormLabel>
                                                <Select>
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
                                                                    <SelectItem {...field} value={item.tab} key={index}>{item.tab}</SelectItem>
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
                                            <FormItem>
                                                <FormLabel>
                                                    Service Name
                                                </FormLabel>
                                                <Input placeholder="" {...field} />
                                            </FormItem>
                                        )}
                                    />
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button
                                                type="submit"
                                                // onClick={addCredentialSubmit}
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
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default SwitcherBlock