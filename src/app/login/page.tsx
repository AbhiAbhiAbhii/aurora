import React from 'react'
import LoginForm from '@/components/forms/login-form'

type Props = {}

const LoginPage = (props: Props) => {

  return (
    <main className="flex flex-col items-center justify-start min-h-screen w-screen py-16 overflow-hidden">
      <div className="mt mt-32">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage