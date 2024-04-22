import { createClient } from "@/utils/supabase/client"

export const getCompanyDetails = async () => { // delete later
    const db =  createClient()
    const response = (await db.from("companies").select("*")).data

    return response
}

export const getUserDetails = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("User_Details").select("*")
    if(error) {
        console.log(error)
    } else {
        console.log(data, "adhjasjdashjkdhjk")
        return data
    }
}
export const getCompanyName = async () => {
    const supabase = createClient()
    const data= (await supabase.from("Companies").select("*")).data
    return data
}

export const getServiceDetails = async (value?:any) => {
    const supabase = createClient()
    const data = (await supabase.from("Service").select("*").eq('company_name', `${value}`)).data
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

export const addNewCredentials = async(
    companyname?: string,
    social?: string, 
    servicename?: string, 
    username?: string, 
    password?: string, 
    url?: string, 
    additionalnotes?: string,
    managedby?:string
) => {
    const supabase = createClient()
    await supabase.from("Service").insert({
        company_name: companyname, 
        type: social, 
        service_name: servicename, 
        user_name: username, 
        password: password, 
        URL: url, 
        additional_notes: additionalnotes,
        managed_by: managedby
    })
}

export const getAuthUsers = async () => {
    const supabase = createClient()
    try {
        const { data, error } = await supabase.auth.getUser()

        if(error) {
            console.log(error, "adjhasd")
        }
        console.log(data, "asdjahsjkdh")
        return data
    } catch(error) {
        console.log(error, "Something went WONG")
    }
}