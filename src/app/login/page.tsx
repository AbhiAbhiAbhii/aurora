import { Button } from '@/components/ui/button'
import React from 'react'
import { login, signup } from './actions'

type Props = {}

const LoginPage = (props: Props) => {

  return (
    <section className='min-h-screen w-screen flex items-center justify-center'>
        <form>
            <div className='flex'>
                <label htmlFor="email">
                    Email
                </label>
                <input id="email" name="email" type="email" required />
            </div>
            <div className='flex'>
                <label htmlFor="email">
                    Password
                </label>
                <input id="password" name="password" type="password" required />
            </div>
            <Button formAction={login}>Login</Button>
            <Button formAction={signup}>Sign up</Button>
        </form>
    </section>
  )
}

export default LoginPage