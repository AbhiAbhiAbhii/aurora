"use client"
import AllAction from "@/app/credentials/_components/all-action"
import DataTableDropDown from "@/app/credentials/_components/data-table-dropdown"
import PasswordFormat from "@/app/credentials/_components/password-format"
import ServiceCheckBox from "@/app/credentials/_components/service-checkbox"
import LoginType from "@/app/credentials/_components/table-header/login-type"
import TypeBadge from "@/app/credentials/_components/type-badge"
import UsernameBox from "@/app/credentials/_components/username-box"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"


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
  is_sso: boolean
  sso_name: string
  login_type: string
}

export const sharedCredentialsColumn: ColumnDef<Service>[] = [
  {
    accessorKey: "service_name",
    header: "Service Name",
    cell: ({ row }) => {
      const data: string = row.getValue('service_name')
      const rowServicenameData: string = row.getValue('service_name')
      const idData: any = row.getValue('id')
      return <ServiceCheckBox rowServicenameData={rowServicenameData} data={data} id={idData} />
    }
  },
  {
    accessorKey: "id",
    header: () => <div className="remove-header"></div>,
    cell:() => <div className="remove-header"></div>,
  },
  {
    accessorKey: "company_name",
    header: () => <div className="remove-header"></div>,
    cell:() => <div className="remove-header"></div>,
  },
  {
    accessorKey: "additional_notes",
    header: () => <div className="remove-header"></div>,
    cell:() => <div className="remove-header"></div>,
  },
  {
    accessorKey: "user_name",
    header: "Username/Email",
    cell: ({ row }) => {
      const data: string = row.getValue('user_name')
      return <UsernameBox data={data} />
    }
  },
  {
    accessorKey: 'login_type',
    header: "Login type",
    cell: ({ row }) => {
      const data: string = row.getValue('login_type')
      const ssoData: string = row.getValue('sso_name')
      const isSSO: boolean = row.getValue('is_sso')

      return <LoginType ssoName={ssoData} isSSO={isSSO} data={data} />
    }
  },
  {
    accessorKey: 'is_sso',
    header: () => <div className="remove-header"></div>,
    cell:() => <div className="remove-header"></div>,
  },
  {
    accessorKey: 'URL',
    header: () => <div className="remove-header"></div>,
    cell:() => <div className="remove-header"></div>,
  },
  {
    accessorKey: 'sso_name',
    header: () => <div className="remove-header"></div>,
    cell:() => <div className="remove-header"></div>,
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
      return <TypeBadge data={data} />
    }
  },
  {
    id: 'actions',
    header: () => <AllAction />,
    cell: ({ row }) => {
      const rowUsernameData:string = row.getValue('user_name')
      const rowPasswordData: string = row.getValue('password')
      const rowServicenameData: string = row.getValue('service_name')
      const boolean: boolean = row.getValue('is_sso')
      const serviceId:number = row.getValue('id')
      const rowTypeData: any = row.getValue('type')
      const rowSSONameData: any = row.getValue('sso_name')
      const rowCompanyNameData: any = row.getValue('company_name')
      const rowLoginTypeData: any = row.getValue('login_type')
      const rowURLData: any = row.getValue('URL')
      const rowAdditionalNotesData: any = row.getValue('additional_notes')

      const allRowData: any = {
        serviceId,
        rowUsernameData,
        rowPasswordData,
        rowServicenameData,
        boolean,
        rowTypeData,
        rowSSONameData,
        rowCompanyNameData,
        rowLoginTypeData,
        rowURLData,
        rowAdditionalNotesData
      }

      return(
        <DataTableDropDown 
          id={serviceId}
          checkState={boolean}
          rowUsernameData={rowUsernameData} 
          rowPasswordData={rowPasswordData}
          rowServicenameData={rowServicenameData}
          allRowData={allRowData}
        />
      )
    }
  }
]
