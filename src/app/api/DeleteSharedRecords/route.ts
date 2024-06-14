import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const supabase = createClient()

    const { email, targetId } = await req.json()
    console.log(email, "target email")
    console.log(targetId, "targetId")

    const { error } = await supabase
        .from('shared_table')
        .delete()
        // .eq('id', targetId)
        .lt('created_at', new Date(new Date().getTime() - 30 * 1000).toISOString())
        console.log('Error', error)
    if (error) {
        throw error
    } else {
        return  NextResponse.json({ message: 'Old records deleted successfully' })
    }

}