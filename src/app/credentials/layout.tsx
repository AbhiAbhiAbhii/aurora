import React from 'react'
import Header from './_components/header/header'
import ContextWrapper from '../../components/global/global-context-wrapper'
import { redirect } from 'next/navigation'
import { getCompanyName } from '@/lib/queries'

const layout = async ({ children } : { children: React.ReactNode }) => {

  const data = await getCompanyName()
  if(!data) redirect('/error')

  return (
    <ContextWrapper>
      <div className='max-w-[2000px] mx-auto'>
        <Header />
        { children }
      </div>
    </ContextWrapper>
  )
}

export default layout