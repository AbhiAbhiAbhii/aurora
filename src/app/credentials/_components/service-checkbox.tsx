import { useGlobalContext } from '@/components/global/my-global-context'
import { Checkbox } from '@/components/ui/checkbox'
import { getServiceRowDetails } from '@/lib/queries'
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'

type Props = {
  data: string
  rowServicenameData: string
  id?: any
}

const ServiceCheckBox = ({ data, rowServicenameData, id }: Props) => {

    const [ initValues, setInitValues ] = useState<any>()
    const { checkBoxIdValue, setCheckBoxIdValue, serviceTableName, tabValue, setSharedCredentialData, currentSessionUser, setTargetId, targetId, isGodCheck } = useGlobalContext()
    const [timeLeft, setTimeLeft] = useState(200) // Initial time left in seconds
    const [ hoverReveal, setHoverReveal ] = useState<boolean>(false)

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
          const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds


          let timeRemaining = twentyFourHours - (now - createdAtTimestamp)
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

  // Calculate stroke-dashoffset based on timeLeft
  const radius = 15 // radius of the circle
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (timeLeft / (24 * 60 * 60)) * circumference

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
        // <div className="flex items-center justify-center">
        //   <div className="text-xl">{`${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</div>
        // </div>
        <div onMouseEnter={() => setHoverReveal(() => true)} onMouseLeave={() => setHoverReveal(() => false)} className="flex items-center justify-center relative time-hover">
          <svg className="w-8 h-8" viewBox="0 0 40 40">
            <circle
              className="text-gray-300"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="20"
              cy="20"
            />
            <circle
              className="text-black"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="20"
              cy="20"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
        </div>
        :
        <Checkbox 
          key={initValues?.service_name}
          checked={checkBoxIdValue.includes(initValues?.service_name)}
          onCheckedChange={() => handleCheckBoxChange(initValues?.service_name)}
        />
      }
      {
        hoverReveal ?
        <div className='reveal-hover'>
          <div className="text-sm">{`${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</div>
        </div>
        :
        <div>
          {data}
        </div>
      }
    </div>
  )
}

export default ServiceCheckBox