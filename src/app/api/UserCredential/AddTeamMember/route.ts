import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    let tableName: string = "User_Details"
    const supabase = createClient()

    const { mailValue, teamLeadMail } = await req.json()

    try {

        const { data } = await supabase.from(`${tableName}`).select().eq('email', mailValue)
        
        if(data) {
            const { in_team } = await data[0]
            if(in_team === teamLeadMail) {
                return NextResponse.json({title: 'Error', message: 'User is already in your team'})
            } 
            else if((in_team === null) || (in_team === '')) {

                const { error } = await supabase.from(`${tableName}`).update({ in_team: teamLeadMail }).eq('email', mailValue)
                if(error !== null) {
                    return NextResponse.json({ title: 'Success', message: 'User is not in a team, successfully added to your team' }, { status: 200 })
                }
                return NextResponse.json({ title: 'Success', message: 'Successfully added member to team'})
            } else {
                return NextResponse.json({ title: 'Error', message: 'User is already in another team' })
            }
        } else {
            return NextResponse.json({ title: 'Error', message: 'User does not exist' })
        }
        
    } catch (err) {
        return NextResponse.json({ message: "Failed to add user", err }, { status: 500 })
    }

}