

export type CompanyData = 
| ({
    id: number
    company_name: string
})[]
| undefined

export type ServiceData = 
| ({
    id: number
    company_name: any
    service_name: string
    password: any
    type: string
    user_name: string
})[]
| undefined

// export type UserDetails =
// | ({
//     id?: number
//     email: string
//     is_god?: boolean
//     user_name: string 
//     password: string
// })[]
// | undefined
