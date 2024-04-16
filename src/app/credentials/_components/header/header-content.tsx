'use client'
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
import React, { useEffect, useState }  from 'react'
import { useGlobalContext } from '../../../../components/global/my-global-context'
import { Check, ChevronsUpDown } from 'lucide-react'
import { CompanyData } from '@/lib/type'
import Image from 'next/image'
import { getCompanyImage } from '@/lib/queries'
import { Skeleton } from '@/components/ui/skeleton'
import SignoutComponent from './sign-out'

type Props = {
    data?: CompanyData[]
}

const Header = ({ data }: Props) => {

    const router = useRouter()
    const [ open, setOpen ] = useState(false)
    const [ source, setSource ] = useState<any>("")
    const [ sourceImage, setSourceImage ] = useState<any>(false)
    const { value, setValue } = useGlobalContext()

    const handleSignOut = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if(!error) {
            router.push("/login")
        } else return alert("Something went WONG")
    }

    useEffect(() => {
        const setInitialImage = async () => {
            const supabase = createClient()
            let file = (await supabase.storage.from("images").list(value)).data?.[0]
            const data = (await supabase.storage.from("images").createSignedUrl(`${value}/${file?.name}`, 60)).data?.signedUrl
            setSource(data)
            setSourceImage(file)
        }
        setInitialImage()
    }, [value])

    const checkImage = () => {
        if(!sourceImage) {
            return(
                <div className='mx-2 h-[40px] w-[40px] flex items-center justify-center rounded-full relative'>
                    <Image 
                        className='rounded-full h-full w-full object-cover'
                        src={source}
                        alt='image'
                        fill 
                        quality={1}   
                    />
                </div>
            )
        } else {
            return(
                <div className='mx-2 h-[40px] w-[40px] flex items-center justify-center rounded-full bg-muted relative'>
                    <p className='text-black text-lg font-inter'>{value.slice(0,2).toUpperCase()}   </p> 
                </div>
            )
        }
    }

  return (
    <div className='w-full flex items-center justify-between py-4 px-10 border'>
        <div>
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger className='!py-[1.8rem]' asChild>
                    <Button
                        className='flex items-center justify-between w-auto'
                        variant={"outline"}
                        role='combobox'
                        aria-expanded={open}
                    >
                        <div className='flex items-center justify-center mr-4'>
                            {
                                source ?
                                checkImage()
                                :
                                <div className='mx-2 h-[45px] w-[45px] flex items-center justify-center rounded-full'>
                                    <Skeleton 
                                        className='h-full w-full rounded-full'
                                    />
                                </div>
                            }
                            <p className='uppercase'>{value}</p>
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
                                                onSelect={ async (currentValue: any) => {
                                                    setValue(currentValue)
                                                    setOpen(false)
                                                    try{
                                                        setSource(await getCompanyImage(currentValue))
                                                    } catch(error) {
                                                        console.log(error)
                                                    }
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
                                
        </div>
        <SignoutComponent 
            handleClick={handleSignOut}
        />
    </div>
  )
}

export default Header