'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Login } from '@/app/login/actions'
import { PacmanLoader } from 'react-spinners'
import { redirect, useRouter } from 'next/navigation'

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

    const [ loading, setLoading ] = useState(false)
    const router = useRouter()
    // 1. Define our form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleLogin = async (values: z.infer<typeof FormSchema>) => {
        const {email, password} = values
        // Login(email,password)

        setLoading((prevState) => !prevState)
        const URL = '/api/Signin'

        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if(!res.ok) {
            console.log('Network response not okay')
        } else {
            router.push('/credentials')
        }

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
                        {
                            loading ?
                            <PacmanLoader 
                                color='#FFF'
                                speedMultiplier={5}
                                size={14}
                            />
                            :
                            "Login"
                        }
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default LoginForm