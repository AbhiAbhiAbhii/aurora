import React from 'react'
import HeaderContent from './header-content'
type Props = {}

const Header = (props: Props) => {    

    return (
        <header className='border border-t-0 border-[#E4E4E7]'>
            <HeaderContent />
        </header>
    )
}

export default Header