import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()

    const { 
            id, 
            passwordData, 
            typeData, 
            clientNameData, 
            userNameData, 
            serviceNameData,
            urlData, 
            additionalNotesData, 
            workSpaceData 
        } = await req.json()
    
    try {
        const { error } = await supabase.from("Users_Servicenames").update({
            id: id,
            password: passwordData,
            type: typeData,
            client_name: clientNameData,
            user_name: userNameData,
            service_name: serviceNameData,
            URL: urlData,
            additional_notes: additionalNotesData,
            shared_to_workspace: workSpaceData
        }).eq('id', id)

        if(error) {
            console.log(error, "Server error")
            return NextResponse.json({ message: "Error", error}, { status: 500 })
        } else {
            return NextResponse.json({ message: "Update success"}, { status: 200 })
        }
    } catch(err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }

}