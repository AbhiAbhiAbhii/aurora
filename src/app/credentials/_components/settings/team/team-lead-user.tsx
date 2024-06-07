import AuroraText from '@/components/global/aurora-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import React, { useEffect, useState } from 'react'

type Props = {
    currentUser: any
}

const TeamLeadUser = ({ currentUser }: Props) => {
    const { user_name, email, is_god, is_team_lead } = currentUser[0]
    const [ userTitle, setUserTitle ] = useState("")
    
    useEffect(() => {
        function runUserCheck() {
            if(is_god && is_team_lead) {
                return setUserTitle(() => "God && Lead")
            }
            else if(!is_god && is_team_lead) {
                return setUserTitle(() => "Lead")
            }
            else if(!is_god && !is_team_lead) {
                return setUserTitle(() => "User")
            } 
            else {
                return setUserTitle(() => "God")
            } 
        }
        runUserCheck()
    }, [])
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
                text={`${user_name}(Team Lead)`}
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
                {userTitle}
            </Badge>
        </div>
    </div>
  )
}

export default TeamLeadUser