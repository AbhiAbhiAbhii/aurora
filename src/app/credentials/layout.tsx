import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

import Header from './_components/header'

const layout = ({ children } : { children: React.ReactNode }) => {

  return (
    <div>
        <Header />
        { children }
    </div>
  )
}

export default layout