import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()

    const { serviceNameData, prevServiceName } = await req.json()

    try {
        const { error } = await supabase.from("Created_at").update({service_name: serviceNameData}).eq('service_name', prevServiceName)

        if(error) {
            console.log(error, "Server error created at log")
            return NextResponse.json({ messsage: "Error", error}, { status: 500 })
        } else {
            return NextResponse.json({ message: "Updated created at log success" }, { status: 200 })
        }

    } catch (err) {
        console.log(err, "aaaa")
        return NextResponse.json({ message: "Error updating created at log", err}, { status: 500 })
    }

}   