import { createClient } from "@/utils/supabase/client"

export const getCompanyDetails = async () => {
    const db =  createClient()
    const response = (await db.from("companies").select("*")).data

    return response
}

export const getUserDetails = async () => {
    return
}