import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Credentials = async (props: Props) => {

    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if(!user) redirect("/login")

  return (
    <div>Credentials</div>
  )
}

export default Credentials