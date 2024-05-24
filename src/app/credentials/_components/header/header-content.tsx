'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useEffect, useState }  from 'react'
import { useGlobalContext } from '../../../../components/global/my-global-context'
import { Check, ChevronsUpDown } from 'lucide-react'
import { CompanyData } from '@/lib/type'
import SignoutComponent from './sign-out'
import AuroraText from '@/components/global/aurora-text'
import { getCompanyName, signOut } from '@/lib/queries'

type Props = {
    // data?: CompanyData[]
}

interface Links {
    linkName: string | undefined,
}

const Header = (props: Props) => {
    
    const router = useRouter()
    const [ open, setOpen ] = useState(false)
    const { value, setValue, setLinkValue, isGodCheck, currentSessionUser } = useGlobalContext()
    const [ linkState, setLinkState ] = useState<number>(0)
    const [ data, setData ] = useState<any>()

    const links: Links[] = 
    isGodCheck ? 
        [{linkName: 'Credentials'}, {linkName: 'Settings'}]
        :
        [{linkName: 'Credentials'}, {linkName: 'Workspace'},{linkName: 'Settings'}]

    const handleSignOut = async () => { // handleSignout function
        const res = await signOut()
        if(res.ok) {
            router.push("/login")
        } else {
            return alert("Something went WONG")
        }
    }

    const handleDropDownSelect = async (currentValue: string) => { // handleSelect function
        setValue(currentValue)
        setOpen(false)
    }

    const handleHeaderListSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => { // handle header list select
        setLinkState(index)
        setLinkValue(e.currentTarget.innerText)
    }

    useEffect(() => {
        async function fetchCompanyData() {
            const companyData = await getCompanyName()
            return setData(() => companyData)
        }
        fetchCompanyData()
    }, [])
    
  return (
    <>
    {
        currentSessionUser ?
            <div className='w-full flex items-center justify-between py-4 px-10'>
                <div className={`flex items-center ${isGodCheck && 'gap-6'}`}>
                    <div>
                        {isGodCheck && (
                            <Popover
                                open={open}
                                onOpenChange={setOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        className='flex items-center justify-between py-[1.8rem] w-[12.3rem]'
                                        variant={"outline"}
                                        role='combobox'
                                        aria-expanded={open}
                                    >
                                        <div className='flex items-center justify-center mr-4'>
                                            <AuroraText 
                                                className='mx-2 h-[40px] w-[40px] flex items-center justify-center 
                                                rounded-full bg-muted relative text-black text-base font-normal font-inter'
                                                text={value.slice(0, 2).toUpperCase()}
                                            />
                                            <p className='uppercase text-foreground font-inter font-medium text-sm'>{value}</p>
                                        </div>
                                        <ChevronsUpDown 
                                            size={12}
                                        />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px] p-0'>
                                    <Command>
                                        <CommandList>
                                            <CommandGroup>
                                                {
                                                    data?.map((item:any, index: number) => {
                                                        return(
                                                            <CommandItem
                                                                key={index}
                                                                className='font-inter font-medium'
                                                                onSelect={(currentValue: string) => handleDropDownSelect(currentValue)}
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
                        )}
                    </div>
                    <div>
                        <ul className='flex items-center'>
                            {
                                links.map((item, index: number) => (
                                    <li
                                        onClick={(e) => handleHeaderListSelect(e, index)}
                                        className={
                                            `mr-6 cursor-pointer transition-all
                                            ${index === linkState ? 'text-black' : 'text-muted-foreground'} 
                                            hover:text-black font-inter font-medium text-sm`
                                        }
                                        key={item.linkName}
                                    >
                                        {item.linkName}
                                    </li>       
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <SignoutComponent handleClick={handleSignOut} />
            </div>
        :
            null
    }
    </>
  )
}

export default Header