"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import React, { Suspense } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })

  let buttonVariant:any = 'outline'
  let size:any = 'sm'
  let iconSize:number = 16 

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter username/email"
          value={(table.getColumn("user_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("user_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-black"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows?.length ? 
              (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )  
              :
              (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4 w-full">
          <div className="flex items-center justify-between w-full">
              {/* Row visibility */}
              <div className="text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">Rows per page</p>
                      <Select
                          value={`${table.getState().pagination.pageSize}`}
                          onValueChange={(value) => {
                          table.setPageSize(Number(value))
                          }}
                      >
                        <SelectTrigger className="h-8 w-[70px]">
                          <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                        {[3, 5, 8, 10, 20].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                        </SelectContent>
                      </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </div>
              </div>
              {/* Pagination Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant={buttonVariant}
                  size={size}
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <DoubleArrowLeftIcon 
                    fontSize={iconSize}
                  />
                </Button>
                <Button
                  variant={buttonVariant}
                  size={size}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon 
                      fontSize={16}
                  />
                </Button>
                <Button
                  variant={buttonVariant}
                  size={size}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRightIcon 
                    fontSize={iconSize}
                  />
                </Button>
                <Button
                  variant={buttonVariant}
                  size={size}
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <DoubleArrowRightIcon 
                    fontSize={iconSize}
                  />
                </Button>
              </div>
          </div>
      </div>
    </>
  )
}
