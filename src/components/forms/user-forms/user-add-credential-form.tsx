'use client'
import Loading from '@/components/global/loading'
import { useGlobalContext } from '@/components/global/my-global-context'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { getClients } from '@/lib/queries'
import { getAlertContainer } from '@/utils/functions/alert-function'
import { getCurrentDate } from '@/utils/functions/date'
import { reloadPage } from '@/utils/functions/reload'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { MutableRefObject, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { PacmanLoader } from 'react-spinners'
import { EyeNoneIcon } from "@radix-ui/react-icons"
import { z } from "zod"

type Props = {
  currentSessionUser: Array<any>
  clientsArray: any
  tabs: any
}

const UserAddCredentialFormSchema = z.object({
  client_name: z.string().min(1, { message: "Select Client Name" }),
  service_name: z.string().min(1, { message: "Enter Service Name" }),
  type: z.string().min(1, { message: "Select Type" }),
  user_name: z.string().min(1, { message: "Enter Username/Email" }),
  password: z.string().min(5, { message: "Must be 5 characters or more" }),
  url: z.string().min(1, { message: 'The url field is required'}),
  additional_notes: z.string(),
  shared_to_workspace: z.boolean()
})

const UserAddCredentialForm = ({ currentSessionUser, clientsArray: initialClientsArray, tabs }: Props) => {


  const { setAlertTitle, setAlertDescription } = useGlobalContext()

  let isTeamLead: boolean
  let name: string
  let email: string
  
  const router = useRouter()
  const clickRef: MutableRefObject<any>= useRef()
  const [ clientsArray, setClientsArray ]= useState<any>(initialClientsArray)
  const [ newClientValue, setNewClientValue ]= useState<any>("")
  const [ disableSelect, setDisableSelect ] = useState(false)
  const [ loadingState, setLoadingState ] = useState(false)
  const [ togglePassClick, setTogglePassClick ] = useState(false)

  const form = useForm<z.infer<typeof UserAddCredentialFormSchema>>({
    resolver: zodResolver(UserAddCredentialFormSchema),
    defaultValues: {
      client_name: "",
      service_name: "",
      type: "",
      user_name: "",
      password: "",
      url: "",
      additional_notes: "",
      shared_to_workspace: false
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
    messageFunction("Error", "Something went WONG")
  }

  const handleCredentialSubmit = async (
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    values: z.infer<typeof UserAddCredentialFormSchema>
  ) => {
    name = currentSessionUser[0].user_name
    email = currentSessionUser[0].email

    const { client_name, service_name, type, user_name, password, url, additional_notes, shared_to_workspace } = values

    const { dateString, timeString } = getCurrentDate()

    const formData = {
      client_name,
      service_name,
      type,
      user_name,
      password,
      url,
      additional_notes,
      shared_to_workspace,
      name,
      email
    }

    const createdAtLogData = { name, email, dateString, timeString, service_name }

    try {
      const res = await fetch("/api/UserCredential", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(!res.ok) {
        throw new Error("Error")
      } else {
        successNotification()
        clickRef.current.click()
        console.log("Success")
        try {
          const response = await fetch("/api/CreatedAtLog", {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(createdAtLogData)
          })
          if(!response.ok) {
            throw new Error("Error")
          } else {
            console.log("Success creating at log")
          }

        } catch(err) {
          console.log("Error created log", err)
        }
      }
    } catch(err) {
      notSuccessNotification()
      clickRef.current.click()
      console.log("Error post credentials", err)
    }
  }

  const handleAddNewClient = async () => {
    name = currentSessionUser[0].user_name
    email = currentSessionUser[0].email

    setLoadingState(() => true)

    const formData = {
      name,
      email,
      newClientValue
    }
    const res = await fetch("/api/NewClientName", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if(!res.ok) {
      alert("Something went wrong")
    } else {
      setLoadingState((prevState) => !prevState)
      const newFetchedClientsArray: any = await getClients()
      setClientsArray(() => newFetchedClientsArray)
      router.refresh()
      console.log("success")
    }
  }


  if(currentSessionUser) {

    isTeamLead= currentSessionUser[0].is_team_lead

    return (
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleCredentialSubmit)}
          className='space-y-7'
        >
          <FormField 
            control={form.control}
            name='client_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type of credentials</SelectLabel>
                        {
                          initialClientsArray.length > 0 && (
                            clientsArray.map((client: any) => <SelectItem disabled={disableSelect} value={client.client_name} key={client.number}>{client.client_name}</SelectItem>)
                          )
                        }
                        {isTeamLead && (
                          <div className='w-11/12 mx-auto mt-2'>
                            <Input
                              onChange={(e) => setNewClientValue(() => e.target.value)}
                              onFocus={() => setDisableSelect(() => true)} 
                              onBlur={() => setDisableSelect((prevState) => !prevState)}
                              placeholder='Enter new client name'
                            />
                            <Button 
                              className='w-full mt-2 mb-4'
                              onClick={handleAddNewClient}
                            >
                              {
                                loadingState ?
                                  // <Loading className='h-6 w-6' />
                                  <PacmanLoader 
                                      color='#FFF'
                                      speedMultiplier={5}
                                      size={14}
                                  />
                                :
                                "Add new client"
                              }
                            </Button>
                          </div>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
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
                        tabs.slice(1, 4).map((item: any, index: number) => (
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
            name='service_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder=''/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='user_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username/Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder=''/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className='w-full relative'>
                  <FormControl>
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
                      onClick={() => setTogglePassClick(!togglePassClick)}
                      className="absolute top-0 right-0 flex items-center justify-center h-full w-9 border-0 border-l cursor-pointer"
                  >
                      <EyeNoneIcon />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='additional_notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional notes</FormLabel>
                <FormControl>
                  <Textarea 
                      {...field}
                      className="resize-none"
                  />                
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='shared_to_workspace'
            render={({ field }) => (
              <FormItem>
                <div
                  className='flex items-center space-x-2'
                >
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Share to workspace</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <SheetFooter className="mt-10">
            <Button
              type='submit'
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
                onClick={(e) => {
                  e.preventDefault()
                  console.log("Cancelled")
                  clickRef.current?.click()
                }}
              >
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </FormProvider>
    )
  } else {
    return <p>Still loading</p>
  }
}

export default UserAddCredentialForm