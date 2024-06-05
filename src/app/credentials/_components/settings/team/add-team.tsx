import AuroraText from '@/components/global/aurora-text'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CurrentUser from './current-user'
import TeamUsers from './team-users'
import AddTeamForm from '@/components/forms/add-team-form'
import { useGlobalContext } from '@/components/global/my-global-context'
import { Separator } from '@/components/ui/separator'
import TeamLeadUser from './team-lead-user'

type Props = {
    filteredUsers: any
}

const AddTeam = ({ filteredUsers }: Props) => {

    const { currentSessionUser, isGodCheck } = useGlobalContext()
    const { is_team_lead, email, in_team } = currentSessionUser[0]

    let teamLeadMail: string
    let teamMembers: any
    let findingTeamLead: any
    let otherTeamMembers: any

    if(is_team_lead || (isGodCheck && is_team_lead)) {
        // Get team lead mail
        teamLeadMail = email
        // Get in_team field to compare mail
        teamMembers = filteredUsers.filter((user: any) => user.in_team === teamLeadMail)
    } 
    else if((!isGodCheck && !is_team_lead)) {
        // Get users in_team value
        // Compare the unique value with other users mail
        findingTeamLead = filteredUsers.filter((user: any) => user.email === in_team)
        otherTeamMembers = filteredUsers.filter((user: any) => user.in_team === findingTeamLead[0].email)
    }

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
                    {isGodCheck || is_team_lead && (
                        <SheetTrigger asChild>
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
                    )}
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
                {isGodCheck && ( // For God admin
                    <>
                    <CurrentUser 
                        currentUser={currentSessionUser}
                    />
                    <div className='space-y-4'>
                        {
                            filteredUsers.map((user:any) => (
                                <TeamUsers
                                    user={user}
                                    key={user.email}
                                />
                            ))
                        }
                    </div>
                    </>
                )}
                {!isGodCheck && is_team_lead &&( // For Team lead
                    <>
                    <CurrentUser 
                        currentUser={currentSessionUser}
                    />
                    {/* Display team members */}
                    {
                        teamMembers.map((user: any) => (
                            <TeamUsers 
                                user={user}
                                key={user.email}
                            />
                        ))
                    }
                    </>
                )}
                {!isGodCheck && !is_team_lead && (
                    <>
                    {/* Display the team lead */}
                    <TeamLeadUser 
                        currentUser={findingTeamLead}
                    />
                    <Separator className='mb-4'/>
                    {/* Display user as first team member */}
                    <CurrentUser 
                        currentUser={currentSessionUser}
                    />
                    {/* Display the rest of the team members */}
                    {otherTeamMembers.map((user: any) => (
                        <TeamUsers 
                            user={user}
                            key={user.email}
                        />
                    ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default AddTeam