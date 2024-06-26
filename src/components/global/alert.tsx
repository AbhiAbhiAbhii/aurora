import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'
import { useGlobalContext } from './my-global-context'

type Props = {}

const AlertContainer = (props: Props) => {

    const { alertTitle, alertDescription } = useGlobalContext()

  return (
    <div 
        className="alert z-50"
    >
        <Alert>
            <RocketIcon
                height={20}
                width={20}
                className="mt-1"
            />
            <AlertTitle className="font-inter font-medium text-sm">
                {alertTitle}
            </AlertTitle>
            <AlertDescription className="font-inter font-normal text-sm leading-3">
                {alertDescription}
            </AlertDescription>
        </Alert>
    </div>
  )
}

export default AlertContainer