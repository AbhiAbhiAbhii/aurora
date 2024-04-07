'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SignUp } from '@/app/login/sign-up'

type Props = {}
// Define our Form Schema/data type
const FormSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }).min(1),
    password: z.string().min(5, {
        message: 'Must be 5 characters or more'
    })
})

const LoginForm = (props: Props) => {   
    
    // 1. Define our form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSignIn = async (values: z.infer<typeof FormSchema>) => {
        // try {
        //     const supabase = createClient()
        //     await supabase.from("user_details").insert({useremail: value.email, userpassword: value.password})
        //     throw new Error("Something went WONG!")
        // } catch(error) {
        //     console.log(error)
        // }
        const {email, password} = values
        SignUp(
            email,
            password
        )
    }



  return (
    <Card className='w-[407px]'>
        <CardHeader 
            className='py-4'
        >
            <CardTitle
                className='font-geist py-2'
            >
                Add Credentials
            </CardTitle>
            <CardDescription
                className='font-geist py-2'
            >
                Enter new credentials
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSignIn)} 
                    className='flex flex-col gap-4'
                >
                    <FormField 
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='aurora@gradical.xyz' 
                                    />
                                </FormControl>
                                <FormMessage className='font-geist' />
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
                                    <Input 
                                        {...field}
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage className='font-geist' />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Sign-up
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default LoginForm