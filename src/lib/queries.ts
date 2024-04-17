import { createClient } from "@/utils/supabase/client"

export const getCompanyDetails = async () => {
    const db =  createClient()
    const response = (await db.from("companies").select("*")).data

    return response
}

export const getUserDetails = async () => {
    
}
export const getCompanyName = async () => {
    const supabase = createClient()
    const data= (await supabase.from("Companies").select("*")).data
    return data
}

export const getServiceDetails = async (value?:any) => {
    const supabase = createClient()
    const data = (await supabase.from("Service").select("*").eq('company_name', `${value}`)).data
    // const data = (await supabase.from("Service").select("*")).data
    return data
}

export const getCompanyImage = async(folderName?:string) => {
    const supabase= createClient()
    const supabaseStorage = supabase.storage.from("images")
    try {
        const file = (await supabaseStorage.list(folderName)).data?.[0]
        const data = (await supabaseStorage.createSignedUrl(`${folderName}/${file?.name}`, 60)).data?.signedUrl
        return data
    } catch(error) {
        console.log(error)
    }
}