'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { PacmanLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { inputClassName, labelClassName, selectCustomClassName } from '@/utils/classnames'
import AlertContainer from '../global/alert'
import { getAlertContainer } from '@/utils/functions/alert-function'
import { useGlobalContext } from '../global/my-global-context'
import { reloadPage } from '@/utils/functions/reload'
import SelectArrowIcon from '@/app/credentials/_components/select-arrow-icon'

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

    const { setAlertTitle, setAlertDescription } = useGlobalContext()
    const [ loading, setLoading ] = useState(false)
    const [ resOkay, setResOkay ] = useState(false)
    const [ switchLogin, setSwitchLogin ] = useState(false)
    const [ formStep, setFormStep ] = useState<number>(0)
    const [ formStepSelect, setFormStepSelect ] = useState<boolean>(false)
    const [ formValues, setFormValues ] = useState<any>({})
    const [ userRole, setUserRole ] = useState<string>('No')
    const router = useRouter()

    const messageFunction = (title: string, description: string) => {
        getAlertContainer()
        setAlertTitle(title)
        setAlertDescription(description)
    }

    const handleUpdate = (title: string, description: string) => {
        messageFunction(title, description)
        setTimeout(() => reloadPage(), 2000)
    }

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

    const handleChange = (e: any) => {
        e.preventDefault()
        const name = e.target.name
        const values = e.target.value
        setFormValues((prevState: any) => ({
            ...prevState,
            [name]: values
        }))
    }

    const hanldeSignup = async (e: any) => {
        e.preventDefault()
        setLoading((prevState) => !prevState)
        const { name, email, password } = formValues
        const formData = {
            name,email, userRole, password
        }
        const signUpUrl = '/api/Signup'
        const res = await fetch(signUpUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const { title, message } = await res.json()

        if(!res.ok) {
            handleUpdate(title, message)
            console.log('Network response not okay', title, message)
        } else {
            setResOkay((prevState) => !prevState)
            console.log('Network response is okay', title, message)
        }
    }

    const handleFormStepClick = (e: any) => {
        e.preventDefault()
        if(formStep < 1) {
            setFormStep((prevState) => prevState + 1)
        } else {
            hanldeSignup(e)
        }
    }

    const handleFormStepSelect = (e: any) => {
        e.preventDefault()
        setFormStepSelect((prevState) => !prevState)
    }

    const isInvalid = Object.keys(formValues).length < 3 || formValues.email === '' || formValues.password === ''

  return (
    <Card className='w-[90%] mx-auto md:w-[412px]'>
        <AlertContainer />
        <CardHeader 
            className='py-4'
        >
            {
                resOkay ?
                <>
                <CardTitle className='font-geist py-1'>
                    Signup success
                </CardTitle>
                <CardDescription className='font-geist py-1'>
                    To continue confirm with the link sent to your email
                </CardDescription>
                </>
                :
                <>
                <CardTitle
                    className='font-geist py-1'
                >
                    {
                        switchLogin ?
                        "Signup to Aurora"
                        :
                        "Login to Aurora"
                    }
                </CardTitle>
                <CardDescription
                    className='font-geist py-1'
                >
                    {
                        switchLogin ?
                        "Enter your details below"
                        :
                        "Enter your email and passsword below to continue."
                    }
                </CardDescription>
                </>
            }
        </CardHeader>
        <CardContent>
            {
                switchLogin ?
                <form>
                    {
                        resOkay ?
                        null
                        :
                        <>
                        {
                        formStep === 0 ?
                        <>
                        <div className='flex flex-col space-y-1 mb-6'>
                            <label className={labelClassName}>
                                Email Address
                            </label>
                            <input 
                                onChange={handleChange} 
                                name='email' 
                                type="text" 
                                placeholder='aurora@gradical.xyz'
                                className={inputClassName} 
                            />
                        </div>
                        <div className='flex flex-col space-y-1 mb-6'>
                            <label className={labelClassName}>
                                Name
                            </label>
                            <input 
                                onChange={handleChange} 
                                name='name' 
                                type="text" 
                                placeholder='Thahaseer'
                                className={inputClassName} 
                            />
                        </div>
                        <div className='flex flex-col space-y-1 mb-4'>
                            <label className={labelClassName}>
                                Password
                            </label>
                            <input onChange={handleChange} name='password' type="password" className={inputClassName} />
                        </div>
                        </>
                        :
                        formStep === 1 ?
                        <div
                            className='flex flex-col space-y-2 mb-4'
                        >
                            <label
                                className={labelClassName}
                            >
                                Are you a team lead?
                            </label>
                            <button
                                onClick={handleFormStepSelect}
                                className={selectCustomClassName}
                            >
                            <span style={{pointerEvents: 'none'}}>{userRole}</span>
                            <SelectArrowIcon />
                            {formStepSelect && <div
                                className={`select-custom-box-activate border bg-white rounded-md z-50`}
                            >
                                <div className='font-semibold flex py-[0.45rem] items-start text-sm pointer-events-none cursor-default'>
                                    <p className='ml-7'>
                                        Choose your role
                                    </p>
                                </div>
                                <div>
                                    {
                                        ['Yes', 'No'].map((item: any) => (
                                            <div
                                                onClick={(e: any) => setUserRole(() => e.target.outerText)}
                                                key={item} 
                                                className='flex py-[0.45rem] items-start text-sm hover:bg-[#F5F5F4] transition rounded-md'
                                            >
                                                <p className='ml-7'>
                                                    {item}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>}
                            </button>
                        </div>
                        :
                        null}   
                        <Button
                            disabled={isInvalid}
                            onClick={handleFormStepClick}
                            className='w-full'
                        >
                            {
                                formStep > 0 ?
                                    loading ?
                                    <PacmanLoader 
                                        color='#FFF'
                                        speedMultiplier={5}
                                        size={14}
                                    />
                                    :
                                    "Complete signup"
                                :
                                "Next"
                            }
                        </Button>
                        </>
                    }
                </form>
                :
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
            }
            {
                resOkay ?
                null
                :
                <p 
                    onClick={() => setSwitchLogin((prevState) => !prevState)}
                    className='text-black mx-auto flex items-center justify-center mt-4 font-geist text-sm cursor-pointer transition-all hover:opacity-70'
                >
                    {
                        switchLogin ?
                        "Already have an account? Login"
                        :
                        "or Create an account?"
                    }
                </p>
            }
        </CardContent>
    </Card>
  )
}

export default LoginForm