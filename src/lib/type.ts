

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
