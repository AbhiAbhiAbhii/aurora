import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()

    const { email, password, userRole, name } = await req.json()
    const signUpData = { email, password }

    const { error } = await supabase.auth.signUp(signUpData)

    if(!error) {
        const { error } = await supabase.from("User_Details").insert({
            is_god: false,
            email: email,
            user_name: name,
            password: password,
            additional_notes: '',
            name: name,
            is_team_lead: userRole,
            in_team: null
        })
        if(!error) {
            return NextResponse.json({ title: 'Success', message: "Successfully signed up, please confirm the link sent to your email" }, { status: 201 })
        } else {
            return NextResponse.json({ title: 'Error', message: error }, { status: 401 })
        }
    } else {
        return NextResponse.json({ title: 'Error', message: error }, { status: 401 })
    }
}