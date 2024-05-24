import React from 'react'
import Header from './_components/header/header'
import ContextWrapper from '../../components/global/global-context-wrapper'

const layout = async ({ children } : { children: React.ReactNode }) => {
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