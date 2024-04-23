"use client"

import AuroraText from "@/components/global/aurora-text"
import { useGlobalContext } from "@/components/global/my-global-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { CopyIcon, MoreHorizontal, Trash2Icon } from "lucide-react"
import PasswordFormat from "./_components/password-format"
import UsernameBox from "./_components/username-box"
import DataTableDropDown from "./_components/data-table-dropdown"

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
}


export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "service_name",
    header: "Service Name",
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
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      const data: string = row.getValue('password')
      return <PasswordFormat data={data} />
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
    cell: ({ row }) => {
      const rowData = row.original
      const rowUsernameData:string = row.getValue('user_name')
      const rowPasswordData: string = row.getValue('password')
      return(
        <DataTableDropDown 
          rowUsernameData={rowUsernameData} 
          rowPasswordData={rowPasswordData}
        />
      )
    }
  }
]
