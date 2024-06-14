import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

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



export const getServiceRowDetails = async(value?:string, tableName?: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from(`${tableName}`).select("*").eq('service_name', value)
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

export const getCurrentUserAllDetail = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser();
    if(error) {
        console.log("Something went WONG")
    } else {
        const authUserEmail = data.user?.email
        const fetchedData = await supabase.from("User_Details").select("*").eq("email", authUserEmail)
        return fetchedData
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

export const deleteAllItems = async (data: any, tableName?: string) => {
    const supabase = createClient()
    const allData = await supabase.from(`${tableName}`).delete().in('id', [...data])
    return allData
}

export const updateItem = async(
    rowId: any,
    companyname: string,
    servicename: string,
    pass: string,
    type: string,
    username: string,
    urll: string,
    additionalnotes: string,
    managedby: string,
    tableName: string,
    sso_name?: string
) => {
    const supabase = createClient()
    try {
        let serviceTable: any = {
            id: rowId,
            company_name: companyname,
            service_name: servicename,
            password: pass,
            type: type,
            user_name: username,
            URL: urll,
            additional_notes: additionalnotes,
            managed_by: managedby,
            sso_name: sso_name
        }

        // let otherTable: any = {
        //     id: rowId,
        //     company_name: companyname,
        //     service_name: servicename,
        //     password: pass,
        //     type: type,
        //     user_name: username,
        //     url: urll,
        //     additional_notes: additionalnotes,
        //     managed_by: managedby,
        //     sso_name: sso_name
        // }

        let updateValue: any = serviceTable

        const { error } = await supabase.from(`${tableName}`).update(updateValue).eq('id', rowId)
        if(error) {
            alert("Something went WONG")
            console.log(error, "ERROR")
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

export const getServiceURL = async (id: number, tableName: any) => {
    const supabase = createClient()
    let value = 'URL' 
    const { data, error } = await supabase.from(`${tableName}`).select(value).eq('id', id)
    if(error) {
        return alert('Something went wrong')
    } else {
        return data[0]
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

export const updateCreatedAtLog = async(serviceName: string, prevServiceName: any) => {
    const supabase = createClient()

    try {
        const { error } = await supabase.from("Created_at").update({service_name: serviceName}).eq('service_name', prevServiceName)
        if(error) {
            throw new Error("Error updating created at log")
        } else {
            console.log("Success")
        }
    } catch(err) {
        console.log("Error", err)
    }
}

export const insertEditLog = async (
    name: string,
    email: string,
    date: string,
    time: string,
    service_name: string,
    items_edited: string
) => {
    const supabase = createClient()
    const { error } = await supabase.from("Edit_Log").insert({
        name: name,
        email: email,
        date: date,
        time: time,
        service_edited: service_name,
        items_edited: items_edited
    })
    if(error) {
        alert("Something went wrong")
    } 
}

export const getEditLogs = async (service_name: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("Edit_Log").select("*").eq("service_edited", service_name)
    if(error) {
        alert("Something went Wong")
    } else {
        return data
    }
}

export const insertCreatedAtLog = async (
    name: string,
    email: string,
    date: string,
    time: string,
    service_name: string
) => {
    const supabase = createClient()
    const { error } = await supabase.from("Created_at").insert({
        name: name,
        email: email,
        date: date,
        time: time,
        service_name: service_name
    })
    if(error) {
        alert("Something went Wong")
    }
}

export const getCreatedAtLog = async (service_name: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("Created_at").select("*").eq("service_name", service_name)
    if(error) {
        alert("Error in fetching created log")
    } else {
        return data
    }
}

export const signOut = async () => {
    const supabase = createClient()
    try {
        const { error } = await supabase.auth.signOut()
        if(!error) {
            console.log("Signed out successfully")
            return NextResponse.json({ message: "Successfully signed out" }, { status: 200 })
        } else {
            throw new Error("Error during Sign out")
        }
    } catch(error) {
        console.log("Error", error)
        return NextResponse.json({ message: "Error signing out" }, { status: 500 })
    }
}

export const currentSessionUserDetails = async () => {
    const supabase = createClient()

    const getCurrentUserEmail = (await supabase.auth.getUser()).data.user?.email
    const usersAllData = (await supabase.from("User_Details").select("*")).data

    return { getCurrentUserEmail, usersAllData }
}

export const getClients = async () => {
    const supabase = createClient()
    try {
        const { data, error } = await supabase.from("Clients").select("client_name")
        if(error) {
            throw new Error("Failed to fetch clients")
        } else {
            return data
        }
        
    } catch(err) {
        console.log("Failed to fetch", err)
    }
}