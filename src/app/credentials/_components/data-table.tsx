"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })


  let buttonVariant:any = 'outline'
  let size:any = 'sm'
  let iconSize:number =16 

  return (

    <>
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
          {table.getRowModel().rows?.length ? (
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
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    {/* Pagination */}
    <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
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
      {/* Advanced Pagination */}
      
    </>
  )
}
