import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const supabase = createClient()

    const body = await req.json()
    const { newClientValue, name, email } = body

    try {
        const { error } = await supabase.from("Clients").insert({
            client_name: newClientValue,
            created_by_name: name,
            created_by_email: email
        })

        if(error) {
            throw new Error("Error in adding a new client")
        } else {
            return NextResponse.json({ message: "Successfully added new client" }, { status: 201 })
        }
    } catch(err) {
        return NextResponse.json({ messsage: "Not able to add new client", err }, { status: 500 })
    }
}

export async function GET() {
    const supabase = createClient()
    try {
        const { data } = await supabase.from("Clients").select("client_name")
        return NextResponse.json({ data }, { status: 200 })
    } catch(err) {
        return NextResponse.json({ message: "Failed ", err }, { status: 500 })
    }
}