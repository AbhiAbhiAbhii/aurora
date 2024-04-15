import React from 'react'
import LoginForm from '@/components/forms/login-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

type Props = {}

const LoginPage = async (props: Props) => {

  const supabase = createClient()
  const { data:{ user } } = await supabase.auth.getUser()

  if(user) redirect('/credentials')

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <div className="w-full">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage