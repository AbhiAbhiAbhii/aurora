import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import DataDisplay from './_components/data-display'

type Props = {}

const Credentials = async (props: Props) => {

  const supabase = createClient()

  // const { data: { user } } = await supabase.auth.getUser()

  // if(!user) redirect("/login")

  return (
    <div className='flex flex-col items-start px-10 justify-center mt-12'>
      <DataDisplay />
    </div>
  )
}

export default Credentials