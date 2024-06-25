import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const supabase = createClient()
    let tableName: string = "User_Details"

    const { name, email, username, password, additionalNotes, userStatus, isLead, teamLeadMail } = await req.json()
    const signupData = { email, password }

    try {   
        const { error } = await supabase.from(`${tableName}`).select().eq("email", email)
        if(error === null) {
            const { error } = await supabase.auth.signUp(signupData)
            if(!error) {
                await supabase.from(`${tableName}`).insert({ // insert data into table
                    is_god: userStatus,
                    email: email,
                    user_name: username,
                    password: password,
                    additional_notes: additionalNotes,
                    name: name,
                    is_team_lead: isLead,
                    in_team: teamLeadMail
                }) 
                return NextResponse.json({ title: 'Success', message: "Successfully sent mail for signup" })
            } else {
                return NextResponse.json({ message: "Error signing up", error})
            }
        } else {
            return NextResponse.json({ title: 'Error', message: "User already exists" })
        }
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 })
    }
    
}