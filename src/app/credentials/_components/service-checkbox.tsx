import { useGlobalContext } from '@/components/global/my-global-context'
import { Checkbox } from '@/components/ui/checkbox'
import { getServiceRowDetails } from '@/lib/queries'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {
  data: string
  rowServicenameData: string
  id?: any
}

const ServiceCheckBox = ({ data, rowServicenameData, id }: Props) => {

    const [ initValues, setInitValues ] = useState<any>()
    const { checkBoxIdValue, setCheckBoxIdValue, serviceTableName, tabValue, setSharedCredentialData, currentSessionUser, setTargetId, targetId, isGodCheck } = useGlobalContext()
    useEffect(() => {
        async function SetInitialValues() {
          let data:any = await getServiceRowDetails(rowServicenameData, serviceTableName)
          setInitValues(() => data[0])
          // setTargetId((prevValue: any) => {
          //   return [...prevValue, id]
          // })
          setTargetId(() => id)
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

  const [timeLeft, setTimeLeft] = useState(20) // Initial time left in seconds

  useEffect(() => {

   if(!isGodCheck) {
    const fetchTimestamp = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('shared_table')
          .select('created_at')
          .order('created_at', { ascending: false })
          .eq('service_name', rowServicenameData)

        if (error) {
          throw error
        }

        // Calculate time left based on fetched timestamp
        if (data && data.length > 0) {
          const createdAtTimestamp = new Date(data[0].created_at).getTime()
          const now = new Date().getTime()
          const thirtySeconds = 30 * 1000 // 30 seconds in milliseconds

          let timeRemaining = thirtySeconds - (now - createdAtTimestamp)
          if (timeRemaining < 0) {
            timeRemaining = 0 // Ensure timeRemaining doesn't go negative
          }

          setTimeLeft(Math.ceil(timeRemaining / 1000)) // Convert to seconds
        }
      } catch (error) {
        console.error('Error fetching timestamp:', error)
      }
    }

    fetchTimestamp()

    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0)) // Decrease time left every second
    }, 1000)

    return () => clearInterval(interval)
   }
  }, [rowServicenameData, currentSessionUser])

  // Format time left to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  useEffect(() => {
    if(!isGodCheck) {
      if(timeLeft === 0) {
        console.log('HIT ZERO')
        let sessionUserEmail: any = currentSessionUser[0].email
    
        const deleteOldRecords = async () => {
          let email: any = currentSessionUser[0].email
          try {
            const response = await fetch('/api/DeleteSharedRecords', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({email, targetId})
            })
            console.log(targetId, email, "hello")
            if(response.ok) {
              const data = await response.json()
              console.log(data.message, 'Our message')
            }
          } catch (error) {
            console.error('Failed to delete old records:', error)
          }
        }
        deleteOldRecords()
        const reFetchSharedCreds = async () => {
          const res = await fetch('/api/UserCredential/GetSharedCreds', {
            method: 'POST',
            headers: {
              'Content-type' : 'application/json'
            },
            body: JSON.stringify({sessionUserEmail})
          })
    
          if(res.ok) {
            const data = await res.json()
            console.log('Re-fetching data timer up', data)
            setSharedCredentialData(() => data)
          } else {
            console.log('Error re-fetching shared creds data')
          }
        }
        setTimeout(() => reFetchSharedCreds(), 6000)
      }
    }
}, [timeLeft])

  return (
    <div className='flex items-center space-x-2'>
      {
        tabValue === 'Shared' ?
        <div className="flex items-center justify-center">
          <div className="text-xl">{`${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</div>
        </div>
        :
        <Checkbox 
          key={initValues?.service_name}
          checked={checkBoxIdValue.includes(initValues?.service_name)}
          onCheckedChange={() => handleCheckBoxChange(initValues?.service_name)}
        />
      } 
      {/* data passed here */}
      <div>
        {data}
      </div>
    </div>
  )
}

export default ServiceCheckBox