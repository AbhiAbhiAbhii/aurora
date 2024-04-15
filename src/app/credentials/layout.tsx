import React from 'react'
import Header from './_components/header'
import ContextWrapper from '../../components/global/global-context-wrapper'
import { redirect } from 'next/navigation'
import { getCompanyName } from '@/lib/queries'

const layout = async ({ children } : { children: React.ReactNode }) => {

  const data = await getCompanyName()
  if(!data) redirect('/error')

  return (
    <ContextWrapper>
      <Header 
        data={data}
      />
      { children }
    </ContextWrapper>
  )
}

export default layout