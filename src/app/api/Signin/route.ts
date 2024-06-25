import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const supabase = createClient()

    const { email, password } = await req.json()

    const data = { email, password }

    const { error } = await supabase.auth.signInWithPassword(data)

    if(error) {
        return NextResponse.json({message: "Error signing up", error }, { status: 500 })
    } else {
        revalidatePath('/credentials', 'layout')
        redirect('/credentials')
    }
}