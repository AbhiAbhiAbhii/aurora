import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest) {

    const supabase = createClient()
    const body = await req.json()
    const { tableName, rowServicenameData } = body
    try {
        const { error } = await supabase.from(`${tableName}`).delete().eq('service_name', rowServicenameData)
        if(error) {
            console.log(error)
            throw new Error("Error")
        } else {
            const { error } = await supabase.from("Created_at").delete().eq('service_name', rowServicenameData)
            if(error) {
                console.log("Error", error)
            } else {
                const { error } = await supabase.from("Edit_Log").delete().eq('service_edited', rowServicenameData)
                if(error) {
                    console.log("Error", error)
                } else {
                    return NextResponse.json( { message: "Deleted from Edit Log" })
                }
                return NextResponse.json({ message: "Deleted from Created log" }, { status: 200 })
            }
            return NextResponse.json({ message: "Deleted item successfully" }, { status: 200 })
        }
    } catch(err) {
        return NextResponse.json({ message: "Error deleting items", err }, { status: 500 })
    }
}