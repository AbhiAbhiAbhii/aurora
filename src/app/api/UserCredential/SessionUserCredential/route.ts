import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()

    const { sessionUserEmail } = await req.json()

    try {
        const { data, error } = await supabase.from("Users_Servicenames").select("*").eq("created_by_email", sessionUserEmail)
        if(error) {
            throw new Error("Error")
        } else {
            return NextResponse.json({ data }, { status: 200 })
        }
    } catch(err) {
        return NextResponse.json({ message: "Failed to fetch data", err }, { status: 500 })
    }
    
}