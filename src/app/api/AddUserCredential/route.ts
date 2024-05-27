import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()

    const body = await req.json()

    const { service_name, password, type, client_name, user_name, url, additional_notes, name, email, shared_to_workspace } = body

    try{
        const { error } = await supabase.from("Users_Servicenames").insert({
            service_name: service_name,
            password: password,
            type: type,
            client_name: client_name,
            user_name: user_name,
            url: url,
            additional_notes: additional_notes,
            created_by_name: name,
            created_by_email: email,
            shared_to_workspace: shared_to_workspace
        })

        if(error) {
            throw new Error("Failed to POST")
        } else {
            return NextResponse.json({ message: "Success" }, { status: 201 })
        }

    } catch(err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}