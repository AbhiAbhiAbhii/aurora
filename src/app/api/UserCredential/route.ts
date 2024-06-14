import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const supabase = createClient()
    try {
        const { data, error } = await supabase.from("Users_Servicenames").select("*")
        if(error) {
            throw new Error("Error fetching")
        } else {
            return NextResponse.json({ data }, { status: 200 })
        }
    } catch(err) {
        return NextResponse.json({ message: "Error fetching data", err }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const supabase = createClient()

    const body = await req.json()

    const { service_name, password, type, client_name, user_name, url, additional_notes, name, email, shared_to_workspace, sharedByEmail } = body


    try{
        const { error } = await supabase.from("Users_Servicenames").insert({
            service_name: service_name,
            password: password,
            type: type,
            client_name: client_name,
            user_name: user_name,
            URL: url,
            additional_notes: additional_notes,
            created_by_name: name,
            created_by_email: email,
            shared_to_workspace: shared_to_workspace,
            shared_by_lead_email: sharedByEmail
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


