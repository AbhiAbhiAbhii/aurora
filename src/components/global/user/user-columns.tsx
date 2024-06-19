'use client'
import AllAction from "@/app/credentials/_components/all-action"
import DataTableDropDown from "@/app/credentials/_components/data-table-dropdown"
import PasswordFormat from "@/app/credentials/_components/password-format"
import ServiceCheckBox from "@/app/credentials/_components/service-checkbox"
import TypeBadge from "@/app/credentials/_components/type-badge"
import UsernameBox from "@/app/credentials/_components/username-box"
import { ColumnDef } from "@tanstack/react-table"

export type UserCredentialsType = {
    id: string 
    created_at: string
    service_name: string
    password: string 
    type: string 
    client_name: string 
    user_name: string 
    URL: string 
    additional_notes: string
    created_by_name: string
    created_by_email: string
    shared_to_workspace: boolean
}

export const userCredentialColumn: ColumnDef<UserCredentialsType>[] = [
    {
        accessorKey: "id",
        header: () => <div className="remove-header"></div>,
        cell:() => <div className="remove-header"></div>,
    },
    {
        accessorKey: "service_name",
        header: "Service Name",
        cell: ({row}) => {
            const data: string = row.getValue("service_name")
            const rowClientNameData: string = row.getValue("service_name")
            return <ServiceCheckBox rowServicenameData={rowClientNameData} data={data} />
        }
    },
    {
        accessorKey: "client_name",
        header: "Client Name",
        cell: ({row}) => {
            const data: string = row.getValue("client_name")
            return <div>{data}</div>
        }
    },
    {
        accessorKey: "user_name",
        header: "Username/Email",
        cell: ({row}) => {
            const data: string = row.getValue('user_name')
            return <UsernameBox data={data} />
        }
    },
    {
        accessorKey: "password",
        header: "Password",
        cell: ({row}) => {
            const data: string = row.getValue('password')
            return <PasswordFormat data={data} />
        }
    }, 
    {
        accessorKey: "type",
        header: "Type",
        cell: ({row}) => {
            const data: string = row.getValue("type")
            return <TypeBadge data={data} />
        }
    },
    {
        id: "actions",
        header: () => <AllAction />,
        cell: ({row}) => {
            const rowUsernameData:string = row.getValue('user_name')
            const rowPasswordData: string = row.getValue('password')
            const rowServicenameData: string = row.getValue('service_name')
            const serviceId:number = row.getValue('id')

            return (
                <DataTableDropDown 
                    id={serviceId}
                    checkState={false}
                    rowUsernameData={rowUsernameData} 
                    rowPasswordData={rowPasswordData}
                    rowServicenameData={rowServicenameData}
                />
            )
        }
    },
]