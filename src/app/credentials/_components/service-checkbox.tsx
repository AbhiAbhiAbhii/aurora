import { useGlobalContext } from '@/components/global/my-global-context'
import { Checkbox } from '@/components/ui/checkbox'
import { getServiceRowDetails } from '@/lib/queries'
import React, { useEffect, useState } from 'react'

type Props = {
    data: string
    rowServicenameData: string
}

const ServiceCheckBox = ({ data, rowServicenameData }: Props) => {

    const [ initValues, setInitValues ] = useState<any>()
    const { checkBoxIdValue, setCheckBoxIdValue } = useGlobalContext()

    useEffect(() => {
        async function SetInitialValues() {
          let data:any = await getServiceRowDetails(rowServicenameData)
          setInitValues(data[0])
        }
        SetInitialValues()
    }, [])


  function handleCheckBoxChange(id:any) {
    setCheckBoxIdValue((prevValue: any) => {
      const isChecked = checkBoxIdValue.includes(id)
      if(isChecked) {
        return prevValue.filter((value:any) => value !== id)
      } else {
        return [...prevValue, id]
      }
    })
  }

  return (
    <div className='flex items-center space-x-2'>
        <Checkbox 
         key={initValues?.id}
         checked={checkBoxIdValue.includes(initValues?.id)}
         onCheckedChange={() => handleCheckBoxChange(initValues?.id)}
        />
        <div>
          {data}
        </div>
    </div>
  )
}

export default ServiceCheckBox