'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import AuroraText from '@/components/global/aurora-text'
import { HistoryIcon } from 'lucide-react'

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
              text='Version History'
              className='mb-4'
            />
              {
                editLogs.slice().reverse().map((item: any) => {
                  return(
                    <div
                      className='mb-7 flex flex-col' 
                      key={item.name}
                    >
                      <div 
                        className='flex items-start'
                        key={item.name}>
                        <div className='mr-2'>
                          <HistoryIcon 
                            size={18}
                          />
                        </div>
                        <AuroraText 
                          text={item.items_edited}
                          className='font-inter font-normal text-sm text-black flex items-end'
                        />
                      </div>
                      <div className='ml-7 mt-2 flex space-x-1'>
                        <AuroraText 
                          text={item.name}
                          className='font-inter text-muted-foreground text-xs'
                        />
                        <AuroraText 
                          text={`- ${item.date} - ${item.time}`}
                          className='font-inter text-muted-foreground text-xs'
                        />
                      </div>
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