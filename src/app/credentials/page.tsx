import ImageUpload from '@/components/global/image-upload'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import CredentialsContent from './_components/credentials/credentials-content'
import { getCompanyImage, getServiceDetails } from '@/lib/queries'
import { DataValue } from '@/components/global/value'
{/* <ImageUpload /> */}

type Props = {}

const Credentials = async (props: Props) => {

    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if(!user) redirect("/login")
    
    const serviceDetails = await getServiceDetails()
    const companyImage = await getCompanyImage()


  return (
    <div className='flex flex-col items-center justify-center'>
      <CredentialsContent 
        data={serviceDetails}
      />
    </div>
  )
}

export default Credentials