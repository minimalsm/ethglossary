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

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export function DataTable ({columns, data, loggedInUserId}) {
  const visibleColumns = columns.filter(column => column.visible !== false);

  const table = useReactTable({
    data,
    columns: visibleColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Access the paginated rows
  const paginatedRows = table.getPaginationRowModel().rows;

  // Check if the logged-in user is in the current page
  const userInCurrentPage = paginatedRows.some(row => row.original.id === loggedInUserId);

  // Find the logged-in user's data from the full dataset
  const loggedInUserData = data.find(row => row.id === loggedInUserId);

  return (
    <>
    <div className="rounded-md max-w-[640px]">
      {/* If the logged-in user is not in the current page, display them separately */}
      {!userInCurrentPage && loggedInUserId && loggedInUserData && (
        <>
        <Table className="mt-4 p- rounded-lg">
          <TableRow className="border-none rounded-full flex items-center justify-start p-4 bg-surface-selected">
            {visibleColumns.map((column, index) => {
              const cellContext = {
                column,
                row: loggedInUserData,
                table
              };
              return (
                <TableCell
                  className={cn(column.cellClassName)}
                  key={column.id}
                  index={index}
                >
                  {flexRender(column.cell, cellContext)}
                </TableCell>
              );
            })}
          </TableRow>
        </Table>
        <div className="w-full flex justify-center">
        <Separator className="my-4 max-w-[120px]" />
        </div>
        </>
      )}
      <Table className='border-none'>
        <TableHeader className="hidden">
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
          {paginatedRows.length ? (
            paginatedRows.map((row) => {    
              return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn("border-none hover:bg-surface-selected rounded-full flex items-center justify-start p-4", row.original.id === loggedInUserId ? "bg-surface-selected rounded-full" : "")} // Highlight logged-in user row
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
          className='rounded-none border-none p-1.5 text-text-primary dark:text-primary bg-none'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft />
          
        </Button>
        <Button
          variant="outline"
          size="sm"
          className='rounded-none border-none p-1.5 text-text-primary dark:text-primary bg-none'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight />
        </Button>
    </div>
    </>
  )
}
