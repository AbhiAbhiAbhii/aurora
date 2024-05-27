'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { MutableRefObject, Ref, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"

type Props = {
  currentSessionUser: Array<any>
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

const UserAddCredentialForm = ({ currentSessionUser }: Props) => {

  const clickRef: MutableRefObject<any> = useRef()

  let isTeamLead

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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    console.log("Submitted")
  }

  if(currentSessionUser) {
    isTeamLead= currentSessionUser[0].is_team_lead
    return (
      <FormProvider {...form}>
        <form
          // onSubmit={form.handleSubmit(handleCredentialSubmit)}
        >
          <FormField 
            control={form.control}
            name='client_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clientname</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='hello there'/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='hello there'/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='service_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servicename</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='hello there'/>
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
                  <Input {...field} placeholder='hello there'/>
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
                  <Input {...field} placeholder='hello there'/>
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
                  <Input {...field} placeholder='hello there'/>
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
                  <Input {...field} placeholder='hello there'/>
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
              onClick={handleCredentialSubmit}
              // type='submit'
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