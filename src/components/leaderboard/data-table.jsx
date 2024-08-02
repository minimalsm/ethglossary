"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import CommentsIcon from '@/components/icons/CommentsIcon'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import ArrowRight from "@/components/icons/ArrowRight"
import ArrowLeft from "@/components/icons/ArrowLeft"

export function DataTable ({columns, data}) {
  const visibleColumns = columns.filter(column => column.visible !== false);


  const table = useReactTable({
    data,
    columns: visibleColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
    <div className="rounded-md max-w-[640px]">
      <Table className='border-none'>
        <TableHeader className="hidden">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                console.log('header', header)
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
            table.getRowModel().rows.map((row) => {    
              return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-none flex items-center justify-start p-4"
              >
                {row.getVisibleCells().map((cell, index) => {
                  
                  const cellClassName = (
                    cell.column.columnDef
                  ).cellClassName

                  return (
                  <TableCell className={cellClassName} key={cell.id} index={index}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )})}
              </TableRow>
            )})
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
    
            <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          className='rounded-none border-none p-1.5 text-primary bg-accent disabled:text-white'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          // disabled={false}
        >
          <ArrowLeft />
          
        </Button>
        <Button
          variant="outline"
          size="sm"
          className='rounded-none border-none p-1.5 text-primary bg-accent disabled:text-white'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          // disabled={false}
        >
          <ArrowRight />
        </Button>
      

    </div>
    </>
  )
}

