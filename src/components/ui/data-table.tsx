import {
    ColumnDef,
    PaginationState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import PageSelector from './pageSelector'
import PageSizeSelector from './pageSizeSelector'
import PaginationButtons from './paginationButton'

/**
 * Represents the props for the DataTable component.
 *
 * @template TData - The type of data for each row in the table.
 * @template TValue - The type of value for each column in the table.
 */
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

/**
 * Renders a data table component.
 *
 * @template TData - The type of the data in the table.
 * @template TValue - The type of the values in the table.
 *
 * @param {DataTableProps<TData, TValue>} props - The props for the DataTable component.
 * @returns {JSX.Element} The rendered DataTable component.
 */
export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    /**
     * Creates a table using the `useReactTable` hook.
     *
     * @param {Array<Object>} data - The data to be displayed in the table.
     * @param {Array<Object>} columns - The columns configuration for the table.
     * @param {Object} state - The state configuration for the table.
     * @param {boolean} state.pagination - Whether pagination is enabled or not.
     * @param {boolean} state.sorting - Whether sorting is enabled or not.
     * @param {Function} getCoreRowModel - The function to get the core row model.
     * @param {Function} getPaginationRowModel - The function to get the pagination row model.
     * @param {Function} onPaginationChange - The function to handle pagination changes.
     * @param {Function} onSortingChange - The function to handle sorting changes.
     * @param {Function} getSortedRowModel - The function to get the sorted row model.
     * @returns {Object} The table object created by the `useReactTable` hook.
     */
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    })

    // The index of the first row on the current page.
    const startIndex =
        table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
        1

    // The index of the last row on the current page.
    const endIndex = Math.min(
        startIndex + table.getState().pagination.pageSize - 1,
        table.getRowCount(),
    )

    /**
     * Renders the DataTable component.
     */
    return (
        <>
            <div className="my-4 rounded-md border bg-white">
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
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
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
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-nowrap px-2">
                <div className="flex-1 text-center text-sm text-neutral-500 lg:text-start">
                    {`Showing ${startIndex} to ${endIndex} of ${table.getRowCount()} entries`}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:space-x-8">
                    <PageSizeSelector
                        pageSize={pagination.pageSize}
                        setPagination={setPagination}
                    />
                    <PageSelector
                        pageIndex={table.getState().pagination.pageIndex}
                        pageCount={table.getPageCount()}
                        setPageIndex={(pageIndex) =>
                            table.setPageIndex(pageIndex)
                        }
                    />
                    <PaginationButtons table={table} />
                </div>
            </div>
        </>
    )
}
