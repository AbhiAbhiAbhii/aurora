import AuroraText from '@/components/global/aurora-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import React from 'react'

type Props = {
    username: any
    email: any
}

const TeamUsers = ({ email, username }: Props) => {
  return (
    <div className='flex items-center gap-3 mb-6'>
        <Avatar>
            <AvatarImage 
                src='/avatar_image.png' alt='avatar image'
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
            <AuroraText
                text={`${username}`}
                className='font-inter font-medium text-sm'
            />
            <AuroraText 
                text={email}
                className='font-inter font-normal text-sm text-muted-foreground mb-1'
            />
            <Badge
                variant={'outline'}
                className='rounded-md px-2 py-1 font-inter font-medium text-xs'
            >
                Admin
            </Badge>
        </div>
    </div>
  )
}

export default TeamUsers