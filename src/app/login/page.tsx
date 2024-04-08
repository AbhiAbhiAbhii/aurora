import React from 'react'
import LoginForm from '@/components/forms/login-form'

type Props = {}

const LoginPage = (props: Props) => {

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <div className="w-full">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage