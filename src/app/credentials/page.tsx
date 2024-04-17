import ImageUpload from '@/components/global/image-upload'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { getCompanyImage, getServiceDetails } from '@/lib/queries'
import DataDisplay from './_components/data-display'

type Props = {}

const Credentials = async (props: Props) => {

  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if(!user) redirect("/login")
  
  const serviceDetails = await getServiceDetails()

  return (
    <div className='flex flex-col items-center justify-center'>
      <DataDisplay 
        data={serviceDetails}
      />
    </div>
  )
}

export default Credentials