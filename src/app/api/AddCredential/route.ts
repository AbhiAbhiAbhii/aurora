import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()
    const body = await req.json()
    const { value, social, service_name, user_name, password, url, additional_notes, managedby, isSSO, ssoName, login_type } = body
    console.log(body, "our Body")

    try {
        const { error } = await supabase.from("Service").insert({ 
            company_name: value, 
            type: social, 
            service_name: service_name, 
            user_name: user_name, 
            password: password, 
            URL: url, 
            additional_notes: additional_notes,
            managed_by: managedby,
            is_sso: isSSO,
            sso_name: ssoName,
            login_type: login_type
        })

        console.log(error, "our ERROR")
        if(error) {
            throw new Error("Failed to insert credential")
        } else {
            return NextResponse.json({ message: "Successfully inserted credential" }, { status: 201 })
        }
    } catch(err) {
        return NextResponse.json({ message: "Failed to insert credential", err }, { status: 500 })
    }

}