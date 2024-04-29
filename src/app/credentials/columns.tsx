"use client"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import PasswordFormat from "./_components/password-format"
import UsernameBox from "./_components/username-box"
import DataTableDropDown from "./_components/data-table-dropdown"
import AllAction from "./_components/all-action"
import ServiceCheckBox from "./_components/service-checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Service = {
  id: string
  company_name:  string
  service_name: string
  password: string
  type: string
  user_name: string
  URL: string
  additional_notes: string
  managed_by: string
  is_goolge: boolean
}

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "service_name",
    header: "Service Name",
    cell: ({ row }) => {
      const data: string = row.getValue('service_name')
      const rowServicenameData: string = row.getValue('service_name')
      return <ServiceCheckBox rowServicenameData={rowServicenameData} data={data} />
    }
  },
  {
    accessorKey: "user_name",
    header: "Username",
    cell: ({ row }) => {
      const data: string = row.getValue('user_name')
      return <UsernameBox data={data} />
    }
  },
  {
    accessorKey: 'is_google',
    header: () => <div className="hidden"></div>,
    cell:({row}) => <div className="hidden"></div>
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      const data: string = row.getValue('password')
      const boolean: boolean = row.getValue('is_google')
      return <PasswordFormat checkValue={boolean} data={data} />
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const data:string = row.getValue('type')
      return (
        <Badge
          variant={'outline'} 
          className="
            bg-white text-foreground rounded-[6px]
             p-2 w-[97px] hover:bg-white hover:text-foreground
            font-inter font-semibold text-xs flex items-center justify-center">
          {data}
        </Badge>
      )
    }
  },
  {
    id: 'actions',
    header: () => <AllAction />,
    cell: ({ row }) => {
      // const rowData = row.original
      const rowUsernameData:string = row.getValue('user_name')
      const rowPasswordData: string = row.getValue('password')
      const rowServicenameData: string = row.getValue('service_name')
      const boolean: boolean = row.getValue('is_google')

      return(
        <DataTableDropDown 
          checkState={boolean}
          rowUsernameData={rowUsernameData} 
          rowPasswordData={rowPasswordData}
          rowServicenameData={rowServicenameData}
        />
      )
    }
  }
]
