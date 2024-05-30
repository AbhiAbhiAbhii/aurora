'use client'
import React from 'react'
import AuroraText from '../aurora-text'
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs'
import { useGlobalContext } from '../my-global-context'
import { DataTable } from '@/app/credentials/_components/data-table'
import { workSpaceColumn } from './workspace-column'
import AlertContainer from '../alert'

type Props = {
  workSpaceData: any
}

interface TabValue {
  tab: string
}

const tabs: TabValue[] = [{tab: 'All'},{tab: 'Operations'},{tab: 'Socials'},{tab: 'Subscriptions'}]

const WorkSpace = ({ workSpaceData }: Props) => {

  const { setTabValue, tabValue } = useGlobalContext()

  const filteredData = () => workSpaceData.filter((item: any) => item.type === tabValue)

  return (
    <div>
      <AlertContainer />
      <AuroraText 
        text="WorkSpace"
        className="font-inter font-semibold text-3xl tracking-[-0.02em] mb-4"
      />
      <Tabs defaultValue={tabs[0].tab}>
        <TabsList>
          {
            tabs.map((item) => (
              <TabsTrigger 
                value={item.tab}
                key={item.tab}
                className="font-inter font-medium text-sm text-muted-foreground"
                onClick={(e) => setTabValue(e.currentTarget.innerText)}
              >
                {item.tab}
              </TabsTrigger>
            ))
          }
        </TabsList>
      </Tabs>
      <div className="mt-12 w-6/6">
        {
          tabValue !== "All" ?
          <DataTable 
            columns={workSpaceColumn}
            data={filteredData()}
          />
          :
          <DataTable 
            columns={workSpaceColumn}
            data={workSpaceData}
          />
        }
       </div>
    </div>
  )
}

export default WorkSpace