'use client'
import { EyeNoneIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { editAccountDetails } from '@/lib/queries'
import SelectArrowIcon from '@/app/credentials/_components/select-arrow-icon'
import { inputClassName } from '@/utils/classnames'

type Props = {
    currentUser: any
}

const EditAccountForm = ({ currentUser }: Props) => {

    let UserData = currentUser[0];

    const [ nameData, setNameData ] = useState<string>("");
    const [ passwordData, setPasswordData ] = useState<string>("");
    const [ emailData, setEmailData ] = useState<string>("");
    const [ togglePassClick, setTogglePassClick ] = useState<boolean>(false);

    let labelClassName: string = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"

    async function handleEditAccountSubmit(e: any) {
        e.preventDefault();
        await editAccountDetails(passwordData, nameData, UserData.id);
        setTogglePassClick(false);
        setTimeout(() => {
            location.reload();
        }, 1000)
    }

    useEffect(() => {
        setNameData(() => UserData.name);
        setPasswordData(() => UserData.password);
        setEmailData(() => UserData.email);
    }, [UserData]);

  return (
    <div>
        <form 
            onSubmit={handleEditAccountSubmit}
        >
            {/* Name */}
            <div className='flex flex-col space-y-2 mb-4'>
                <label className={labelClassName}>
                    Name
                </label>
                <input 
                    value={nameData}
                    placeholder={nameData}
                    onChange={(e) => {
                        setNameData(e.target.value)
                    }}
                    name='service_name'
                    className={`${inputClassName}`}
                    type="text" 
                />
            </div>
            {/* Email */}
            <div className='flex flex-col space-y-2 mb-4'>
                <label className={labelClassName}>
                    Email
                </label>
                <input 
                    value={emailData}
                    placeholder={emailData}
                    name='service_name'
                    className={`${inputClassName}`}
                    disabled
                    type="text" 
                />
            </div>
            {/* Password */}
            <div className='flex flex-col space-y-2 mb-4'>
                <label className={labelClassName}>
                    Password
                </label>
                <div
                    className='w-full relative'
                >
                    <input
                        value={passwordData}
                        onChange={(e) => setPasswordData(e.target.value)}
                        name='password' 
                        className={`${inputClassName}`}
                        type={
                            togglePassClick ?
                            "text"
                            :
                            "password"
                        }
                    />
                    <div
                        onClick={() => setTogglePassClick((prevValue) => !prevValue)}
                        className="absolute top-0 right-0 flex items-center justify-center h-full w-9 border-0 border-l cursor-pointer"
                    >
                        <EyeNoneIcon />
                    </div>
                </div>
            </div>
            {/* CTA Submit */}
            <div className='mt-6'>
                <Button
                    type='submit'
                >
                    Save Changes
                </Button>
            </div>
        </form>
    </div>
  )
}

export default EditAccountForm