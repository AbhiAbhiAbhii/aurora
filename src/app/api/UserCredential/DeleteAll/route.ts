import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest) {
    const supabase = createClient()

    const body = await req.json()
    const { serviceTableName, checkBoxIdValue } = body

    console.log(checkBoxIdValue)

    try {
        const { error } = await supabase.from(`${serviceTableName}`).delete().in('service_name', [...checkBoxIdValue])
        if(error) {
            console.log(error, "Error")
        } else {
            const { error } = await supabase.from("Created_at").delete().in('service_name', [...checkBoxIdValue])
            if(error) {
                console.log("Error", error)
            } else {
                const { error } = await supabase.from("Edit_Log").delete().in('service_edited', [...checkBoxIdValue])
                if(error) {
                    console.log("Error", error)
                } else {
                    return NextResponse.json( { message: "Deleted from Edit Log" })
                }
                return NextResponse.json({ message: "Deleted from Created log" }, { status: 200 })
            }
        }
    } catch(err) {
        return NextResponse.json({ message: "Error deleting item", err }, { status: 500 })
    }
}