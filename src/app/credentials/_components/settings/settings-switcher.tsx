import React from 'react'

type Props = {
    setTabState: any,
    tabState: string
}

const SettingSwitcher = ({ setTabState, tabState }: Props) => {
  return (
    <div className='flex flex-col w-[36%] items-start'>
        {
          ['Account', 'Team'].map((item, index) => {
            return(
              <button
                onClick={(e: any) => setTabState(e.target.innerText)}
                className={`font-inter font-medium text-sm
                  w-full flex items-start hover:bg-[#F5F5F4] p-2 pl-3 transition-all rounded-sm
                  ${tabState === item ? 'bg-[#F5F5F4]': undefined}`}
                key={index}
              >
                {item}
              </button>
            )
          })
        }
    </div>
  )
}

export default SettingSwitcher