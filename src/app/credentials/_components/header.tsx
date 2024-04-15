'use client'
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useState }  from 'react'
import { useGlobalContext } from '../../../components/global/my-global-context'
import { Check, ChevronsUpDown } from 'lucide-react'
import { CompanyData } from '@/lib/type'

type Props = {
    data?: CompanyData[]
}

const Header = ({ data }: Props) => {

    const router = useRouter()
    const [ open, setOpen ] = useState(false)
    const { value, setValue } = useGlobalContext()

    const handleSignOut = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if(!error) {
            router.push("/login")
        } else return alert("Something went WONG")
    }

  return (
    <div className='w-full flex items-center justify-between py-4 px-10 border'>
        <div>
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        role='combobox'
                        aria-expanded={open}
                    >
                        {
                            value 
                        }
                        <ChevronsUpDown 
                            size={20}
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                    <Command>
                        {/* <CommandInput placeholder='Search Company' />
                        <CommandEmpty>No company found.</CommandEmpty> */}
                        <CommandList>
                            <CommandGroup>
                                {
                                    data?.map((item:any, index: number) => {
                                        return(
                                            <CommandItem
                                                key={index}
                                                onSelect={(currentValue: any) => {
                                                    setValue(currentValue)
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check 
                                                    className={cn
                                                        ("mr-2 h-4 w-4", value === item.company_name ? "opacity-100" : "opacity-0")
                                                    }
                                                />
                                                    {item.company_name}
                                            </CommandItem>
                                        )
                                    })
                                }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"outline"}>
                        Signout
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to signout ?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={() => handleSignOut()}
                        >
                            <Button className=''>
                                SignOut
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  )
}

export default Header