import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import React from 'react'

type Props = {
    data: string
}

const OwnerBadge = ({ data }: Props) => {
  return (
    <div className='flex items-center space-x-2'>
        <Avatar>
            <AvatarImage 
                src='/avatar_image.png' alt='avatar image'
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Badge
            variant={'outline'} 
            className="
            bg-white text-foreground rounded-[6px]
                p-2 w-[97px] hover:bg-white hover:text-foreground
            font-inter font-semibold text-xs flex items-center justify-center"
        >
        {data}
        </Badge>
    </div>
  )
}

export default OwnerBadge