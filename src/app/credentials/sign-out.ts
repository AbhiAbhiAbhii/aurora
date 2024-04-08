"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function SignOut() {
    const supabase = createClient()

    try {
        const { error } = await supabase.auth.signOut()

        if(error) {
            console.log("Someting went wrong", error)
        }

        redirect("/login")

    } catch (err) {
        console.log(err)
    }

}
