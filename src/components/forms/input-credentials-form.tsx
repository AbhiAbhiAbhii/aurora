'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

type Props = {}

const InputCredentialsForm = (props: Props) => {

    const form = useForm()
    

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
        <CardContent className='flex flex-col gap-4'>
            <Form {...form}>
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
                                    placeholder='password' 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button 
                    type='submit'
                >
                    Submit
                </Button>
            </Form>
        </CardContent>
    </Card>
  )
}

export default InputCredentialsForm