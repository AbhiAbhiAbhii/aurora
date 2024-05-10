import { createClient } from "@/utils/supabase/client"

export const getCompanyDetails = async () => { 
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

export const getServiceRowDetails = async(value?:string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("Service").select("*").eq('service_name', value)
    if(!error) {
        return data
    } else {
        console.log(error, "Something went Wong")
    }
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
    managedby?: string,
    is_sso?: string, 
    ssoName?: string, 
    login_type?: string, 
) => {
    const supabase = createClient()
    const { error } = await supabase.from("Service").insert({
        company_name: companyname, 
        type: social, 
        service_name: servicename, 
        user_name: username, 
        password: password, 
        URL: url, 
        additional_notes: additionalnotes,
        managed_by: managedby,
        is_sso: is_sso,
        sso_name: ssoName,
        login_type: login_type
    })

    return error
}

export const getAuthUsers = async () => {
    const supabase = createClient()
    try {
        const { data, error } = await supabase.auth.getUser()

        if(error) {
            console.log(error, "adjhasd")
        }
        return data
    } catch(error) {
        console.log(error, "Something went WONG")
    }
}

export const deleteItem = async (service_name:string) => {
    const supabase = createClient()
    const data = await supabase.from("Service").delete().eq('service_name', service_name)
    return data
}

export const deleteRowItem = async (dataId: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("Service").delete().eq('id', dataId)
    if(error) {
        console.log("Something went WONG")
    }
}

export const deleteAllItems = async (data: any) => {
    const supabase = createClient()
    const allData = await supabase.from("Service").delete().in('id', [...data])
    return allData
}

export const updateItem = async(
    rowId: any,
    companyname: string,
    servicename: string,
    pass: string,
    type: string,
    username: string,
    url: string,
    additionalnotes: string,
    managedby: string,
    sso_name?: string
) => {
    const supabase = createClient()
    try {
        
      const { error } = await supabase.from("Service").update({
            id: rowId,
            company_name: companyname,
            service_name: servicename,
            password: pass,
            type: type,
            user_name: username,
            URL: url,
            additional_notes: additionalnotes,
            managed_by: managedby,
            sso_name: sso_name
        }).eq('id', rowId)
        if(error) {
            alert("Something went WONG")
        }
    } catch(err) {
        console.log(err, "Something went WONG")
    }
}

export const editAccountDetails = async (
    password?: string,
    name?: string,
    columnId?: any
) => {
    const supabase = createClient();

    await supabase.from("User_Details").update({
        name: name, 
        password: password
    }).eq('id', columnId);
    await supabase.auth.updateUser({ password: password });
}

export const getServiceURL = async (id: number) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("Service").select('URL').eq('id', id);
    if(error) {
        return alert('Something went wrong');
    } else {
        return data[0].URL;
    }
}

export const editLinkedPassword = async (
    passwordData: string,
    userNameData: string
) => {
    const supabase = createClient()
    const { error } = await supabase.from("Service").update({
        password: passwordData
    }).eq('user_name', userNameData)
    
    return error
}