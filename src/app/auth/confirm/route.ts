import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash') // getting token hash from our searchParams
    const type = searchParams.get('type') as EmailOtpType | null // getting type from our searchParams as EmailOtpType
    const next = searchParams.get('next') ?? '/'

    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = next
    redirectTo.searchParams.delete('token_hash')
    redirectTo.searchParams.delete('type')

    if (token_hash && type) {
        const supabase = createClient()

        const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
        })
        if (!error) {
        redirectTo.searchParams.delete('next')
        return NextResponse.redirect(redirectTo)
        }
    }

    // return the user to an error page with some instructions
    redirectTo.pathname = '/error'
    return NextResponse.redirect(redirectTo)
}