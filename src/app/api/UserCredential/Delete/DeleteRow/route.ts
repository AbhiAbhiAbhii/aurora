import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest) {
    const supabase = createClient()

    const { id } = await req.json()
 
    try {
        const { error } = await supabase.from("Users_Servicenames").delete().eq('id', id)

        if(error) {
            console.log(error, "wassap homie", id)
            return NextResponse.json({ message: "Delete error", error }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Deleted row data" }, { status: 200 })
        }

    } catch(err) {
        return NextResponse.json({ message: "Error deleting", err }, { status: 500 })
    }

}