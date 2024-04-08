import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

import Header from './_components/header'

const layout = async ({ children } : { children: React.ReactNode }) => {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if(!user) redirect("/login")

  return (
    <div>
        <Header />
        { children }
    </div>
  )
}

export default layout