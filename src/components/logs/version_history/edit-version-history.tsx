'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import AuroraText from '@/components/global/aurora-text'

type Props = {
  editLogs: any
  createdAtLog: any
  rowServicenameData: string
}

const VersionHistory = ({ editLogs, createdAtLog, rowServicenameData }: Props) => {
  const { name, time, date } = createdAtLog[0]
  return (
    <Sheet>
        <SheetTrigger>
          Version History
        </SheetTrigger>
        <SheetContent 
          className="w-[80%] min-w-[500px] overflow-y-scroll"
        >
          <div className="w-[380px] min-w-[80%] ml-4 mt-12">
            <AuroraText 
              text='Last Edited'
              className='mb-4'
            />
              {
                editLogs.slice().reverse().map((item: any) => {
                  return(
                    <div className='mb-2' key={item.name}>
                      {item.name}
                      {item.time}&nbsp;
                      {item.items_edited}
                    </div>
                  )
                })
              }
              <div>
                <div 
                  className='flex items-center'
                >
                  <AuroraText 
                    text='Created'
                    className='font-inter font-semibold text-sm text-black flex items-end'
                  />
                  <AuroraText 
                    text={`${date} - ${time}`}
                    className='ml-2 font-inter text-muted-foreground text-xs'
                  />
                </div>
                <AuroraText 
                  text={`Service ${rowServicenameData} created by ${name}`}
                  className='font-inter text-muted-foreground text-xs mt-1'
                />
              </div>
          </div>
        </SheetContent>
    </Sheet>
  )
}

export default VersionHistory