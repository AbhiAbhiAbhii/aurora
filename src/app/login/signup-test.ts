"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function SignUpTeam(name: string, password: string, email: string, username?: string, additionalNotes?: string, role?: string, isLead?: boolean) {
    const supabase = createClient()
    const data = {
        password,
        email,
    }
    let god

    if(role === "God") {
        god = "TRUE"
    } else {
        god = "FALSE"
    }

    const { error } = await supabase.auth.signUp(data)
    if(error) {
        redirect('/error')
    } else {
        await supabase.from("User_Details").insert({
            is_god: god,
            email: email,
            user_name: username,
            password: password,
            additional_notes: additionalNotes,
            name: name,
            is_team_lead: isLead
        })
    }
}