'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Login, SignUp } from '@/app/login/actions'

type Props = {}
// Define our Form Schema/data type
const FormSchema = z.object({
    // username: z.string().min(1, {
    //     message: "Must be 5 characters or more"
    // }),
    email: z.string().email({
        message: 'Invalid email address'
    }).min(1),
    password: z.string().min(5, {
        message: 'Must be 5 characters or more'
    })
})

const LoginForm = (props: Props) => {   
    
    const [ boolean, setBoolean ] = useState(true)

    // 1. Define our form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            // username: "" ,
            email: "",
            password: "",
        }
    })

    const handleLogin = async (values: z.infer<typeof FormSchema>) => {
        const {email, password} = values
        Login(
            email,
            password
        )
        // try {
        //     SignUpTest(
        //         password,
        //         email,
        //         username,
        //         // boolean
        //     )
        //     alert("Success")
        // } catch(error) {
        //     alert("something went wong")
        // }
    }

  return (
    <Card className='w-[90%] mx-auto md:w-[412px]'>
        <CardHeader 
            className='py-4'
        >
            <CardTitle
                className='font-geist py-2'
            >
                Login to Aurora
            </CardTitle>
            <CardDescription
                className='font-geist py-2'
            >
                Enter your email below to continue.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleLogin)} 
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
                    {/* <FormField 
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='enter your username' 
                                    />
                                </FormControl>
                                <FormMessage className='font-geist' />
                            </FormItem>
                        )}
                    /> */}
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
                        Continue
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default LoginForm