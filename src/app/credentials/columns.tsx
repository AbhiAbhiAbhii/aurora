"use client"

import AuroraText from "@/components/global/aurora-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2Icon } from "lucide-react"

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
  },
  {
    accessorKey: "password",
    header: "Password",
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
      return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className="h-6 w-6 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={10} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Copy Username</DropdownMenuItem>
            <DropdownMenuItem>Visit Login</DropdownMenuItem>
            <DropdownMenuItem>Copy Password</DropdownMenuItem>
            <DropdownMenuItem>Share Credential</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center justify-between"
            >
              <AuroraText 
                text="Delete"
              />
              <Trash2Icon size={15} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
