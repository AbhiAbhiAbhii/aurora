import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()

    const { name, email, username, password, additionalNotes, role, isLead, teamLeadMail } = await req.json()
    const singupData = { email, password }
    console.log(email, "AAAAAAAAAAAAAAAAA")
    let tableName: string = "User_Details"
    try {
        // Check A if user is in database
        const { data, error } = await supabase.from(`${tableName}`).select().eq("email", email)
        console.log(error, "BBBBBBBBBBBBBBBBBBBBBB")
        if(error === null) {
            // User not found in database
            // forward to signup
            // add to team under teamLead
            console.log("CCCCCCC")
            const { error } = await supabase.auth.signUp(singupData) // sign up
            if(!error) {
                await supabase.from(`${tableName}`).insert({ // insert data into table
                    is_god: role,
                    email: email,
                    user_name: username,
                    password: password,
                    additional_notes: additionalNotes,
                    name: name,
                    is_team_lead: isLead,
                    in_team: teamLeadMail
                })
                console.log("DDDDDDDD")
                return NextResponse.json({ message: "Successfully sent mail for signup" })
            } else {
                return NextResponse.json({ message: "Error signing up"})
            }
        } else {
            // User found in database
            const ourData: any = data
            const userData = ourData[0]
            // User in_team check
            if(userData.in_team === null || userData.in_team === '') {
                // update in_team
                const { error } = await supabase.from(`${tableName}`).update({ in_team: teamLeadMail }).eq('email', userData.email)
                if(!error) {
                    return NextResponse.json({ message: "User is not in a team, user has been assigned to your team" })
                }
            } 
            else if(userData.in_team !== teamLeadMail) { 
                return NextResponse.json({ message: "User is already in another team" })
            } else { // user already in your team
                return NextResponse.json({ message: "User is already in your team" })
            }
        }
    } catch(err) {
        return NextResponse.json({ err }, { status: 500 })
    }
}