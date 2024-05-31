import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export async function GET() {
    const supabase = createClient()
    try {
        const { data, error } = await supabase.from("Users_Servicenames").select("*").eq('shared_to_workspace', true)
        if(error) {
            throw new Error("Error fetching data")
        } else {
            return NextResponse.json({ data }, { status: 200 })
        }
    } catch(err) {
        return NextResponse.json({ message:"Error", err }, { status: 500 })
    }
}