'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function Login(email: string, password: string) {
  const supabase = createClient()

  const data = {
    email,
    password
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if(error) redirect("/error")

  revalidatePath('/credentials', 'layout')
  redirect("/credentials")
}


export async function SignUp(email: string, password: string) {
  const supabase = createClient()

  const data = {
    email,
    password
  }

  const { error } = await supabase.auth.signUp(data)

  if(error) redirect('/error')

  revalidatePath('/', 'layout')
  redirect('/')

}