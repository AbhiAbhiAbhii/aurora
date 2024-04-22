"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function SignUpTest(password: string, email: string, username?: string) {
    const supabase = createClient()
    const data = {
        password,
        email,
    }
    const { error } = await supabase.auth.signUp(data)
    if(error) {
        redirect('/error')
    } else {
        await supabase.from("User_Details").insert({
            is_god: "TRUE",
            email: email,
            user_name: username,
            password: password
        })
    }
}