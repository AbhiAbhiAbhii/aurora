import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {

    const supabase = createClient()

    const { name, email, dateString, timeString, serviceNameData, itemsEdited } = await req.json()

    try {

        const { error } = await supabase.from("Edit_Log").insert({
            name: name,
            email: email,
            date: dateString,
            time: timeString,
            service_edited: serviceNameData,
            items_edited: itemsEdited
        })
        if(error) {
            throw new Error('Error')
        } else {
            return NextResponse.json({ message: "Inserted into edit log" }, { status: 201 })
        }

    } catch(err) {
        return NextResponse.json({ message: "Error posting to edit log" }, { status: 500 })
    }

}