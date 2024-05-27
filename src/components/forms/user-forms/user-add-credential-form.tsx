'use client'
import Loading from '@/components/global/loading'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { getClients } from '@/lib/queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { MutableRefObject, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
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

  let isTeamLead: boolean
  let name: string
  let email: string
  
  const router = useRouter()
  const clickRef: MutableRefObject<any>= useRef()
  const [ clientsArray, setClientsArray ]= useState<any>(initialClientsArray)
  const [ newClientValue, setNewClientValue ]= useState<any>("")
  const [ disableSelect, setDisableSelect ] = useState(false)
  const [ loadingState, setLoadingState ] = useState(false)

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


  const handleCredentialSubmit = async (
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    values: z.infer<typeof UserAddCredentialFormSchema>
  ) => {
    name = currentSessionUser[0].user_name
    email = currentSessionUser[0].email
    const { client_name, service_name, type, user_name, password, url, additional_notes, shared_to_workspace } = values
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
    try {
      const res = await fetch("api/AddUserCredential", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if(!res.ok) {
        throw new Error("Error")
      } else {
        console.log("Success")
      }

    } catch(err) {
      console.log("Error", err)
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
                            clientsArray.map((client: any, index: number) => <SelectItem disabled={disableSelect} value={client.client_name} key={client.number}>{client.client_name}</SelectItem>)
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
                                  <Loading className='h-6 w-6' />
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
                <FormControl>
                  <Input {...field} placeholder='' />
                </FormControl>
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
                    <Checkbox onChange={field.onChange} />
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