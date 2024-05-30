import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const supabase = createClient()
    const body = await req.json()
    const { name, email, dateString, timeString, service_name } = body
    try {
        const { error } = await supabase.from("Created_at").insert({
            name: name,
            email: email,
            date: dateString,
            time: timeString,
            service_name: service_name
        })

        if(error) {
            throw new Error("Error")
        } else {
            return NextResponse.json({ message: "Success, created log" }, { status: 201 })
        }
    } catch(err) {
        return NextResponse.json({ message: "Error creating log", err }, { status: 500 })
    }
}