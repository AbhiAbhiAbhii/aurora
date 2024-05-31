import { Badge } from '@/components/ui/badge'
import React from 'react'

type Props = {
  data: string
}

const TypeBadge = ({ data }: Props) => {
  return (
    <Badge
        variant={'outline'} 
        className="
        bg-white text-foreground rounded-[6px]
        p-2 w-[97px] hover:bg-white hover:text-foreground
        font-inter font-semibold text-xs flex items-center justify-center mx-auto"
    >
      {data}
    </Badge>
  )
}

export default TypeBadge