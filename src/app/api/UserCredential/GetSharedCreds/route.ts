import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const supabase = createClient()
    
    const { sessionUserEmail } = await req.json()

    try {
        const { data, error } = await supabase.from('shared_table').select('*').eq('shared_to_email', sessionUserEmail)

        console.log('AAAAAAAAAAAAAA')
        console.log(error, 'SERVER ERROR')
        console.log(data, 'SERVER DATA')

        if(!error) {
            console.log('BBBBBBBBBBBBBBBBBB')
            return NextResponse.json(data, { status: 200 })
        } else {
            console.log('CCCCCCCCCCCCCCCCC')
            return NextResponse.json(error, { status: 500 })
        }

    } catch (err) {
        return NextResponse.json({ message: 'Error', err }, { status: 500 })
    }
}