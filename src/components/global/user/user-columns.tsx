'use client'
import AllAction from "@/app/credentials/_components/all-action"
import DataTableDropDown from "@/app/credentials/_components/data-table-dropdown"
import { ColumnDef } from "@tanstack/react-table"

export type UserCredentialsType = {
    id: string 
    created_at: string
    service_name: string
    password: string 
    type: string 
    client_name: string 
    user_name: string 
    url: string 
    additional_notes: string
    created_by_name: string
    created_by_email: string
    shared_to_workspace: boolean
}

export const userCredentialColumn: ColumnDef<UserCredentialsType>[] = [
    {
        accessorKey: "client_name",
        header: "Client Name",
        cell: ({row}) => <p>Client Name column</p>
    },
    {
        accessorKey: "service_name",
        header: "Service Name",
        cell: ({row}) => <p>Service Name column</p>
    },
    {
        accessorKey: "user_name",
        header: "Username/Email",
        cell: ({row}) => <p>Username/Email column</p>
    },
    {
        accessorKey: "password",
        header: "Password",
        cell: ({row}) => <p>Passowrd column</p>
    }, 
    {
        accessorKey: "type",
        header: "Type",
        cell: ({row}) => <p>Type column</p>
    },
    {
        id: "actions",
        header: () => <AllAction />,
        cell: ({row}) => {
            return (
                // <DataTableDropDown />
                <>...</>
            )
        }
    },
]