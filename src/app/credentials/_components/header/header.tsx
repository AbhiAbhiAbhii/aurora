import React, { useState }  from 'react'
import HeaderContent from './header-content'
import { getCompanyDetails, getCompanyImage, getCompanyName } from '@/lib/queries'
import { redirect } from 'next/navigation'
type Props = {}

const Header = async (props: Props) => {

    const companyName = await getCompanyName()
    if(!companyName) redirect('/error')

    return (
        <header>
            <HeaderContent 
                data={companyName}
            />
        </header>
    )
}

export default Header