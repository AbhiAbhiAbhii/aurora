import React from 'react'

type Props = {
    label: string
}

const AuroraFormField = ({ label }: Props) => {
  return (
    <div>
        <label>
            { label }
        </label>
        
    </div>
  )
}

export default AuroraFormField