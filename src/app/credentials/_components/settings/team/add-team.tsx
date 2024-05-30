import AuroraText from '@/components/global/aurora-text'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import React from 'react'
import CurrentUser from './current-user'
import TeamUsers from './team-users'
import AddTeamForm from '@/components/forms/add-team-form'
import { useGlobalContext } from '@/components/global/my-global-context'

type Props = {
    currentUser: any
    filteredUsers: any
}

const AddTeam = ({ currentUser, filteredUsers }: Props) => {

    const { currentSessionUser, isGodCheck } = useGlobalContext()
  return (
    <div>
        <Sheet>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <AuroraText 
                        text='Add your team'
                        className="font-inter font-semibold text-base tracking-[-0.02em]"
                    />
                    <AuroraText 
                        text='Manage adminstrators for the database'
                        className='font-inter font-normal text-sm text-muted-foreground'
                    />
                </div>
                <SheetTrigger
                    asChild
                >
                    <Button 
                        className="flex items-center font-inter font-medium text-sm"
                    >
                        <Plus 
                            className='mr-4'
                            size={16}
                        />
                        Add Member
                    </Button>
                </SheetTrigger>
            </div>
            <SheetContent 
                className="w-[80%] min-w-[500px] overflow-y-scroll"
            >
                <div className="w-[380px] min-w-[80%] ml-4">
                    <SheetHeader className="mt-8">
                        <SheetTitle 
                            className="font-geist font-medium text-2xl text-foreground"
                        >
                            Add New Team
                        </SheetTitle>
                    </SheetHeader>
                    <div 
                        className="mt-4"
                    >
                        <AddTeamForm />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
        <div 
            className='mt-12'
        >
            <CurrentUser 
                email={currentUser[0].email}
                username={currentUser[0].name}
                god={currentUser[0].is_god}
            />
            <div className='space-y-4'>
                {isGodCheck && (
                    filteredUsers.map((user:any) => (
                        <TeamUsers
                            god={user.is_god}
                            key={user.email}
                            email={user.email}
                            username={user.name}
                        />
                    ))
                )}
            </div>
        </div>
    </div>
  )
}

export default AddTeam