import { Button } from '@/components/ui/button'
import { EmployeeType } from '@/types/employeeType'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'

/**
 * Determines the button style based on the sorting state.
 * @param {boolean} isSorted - Indicates if the column is sorted.
 * @returns {string} The button style classes.
 */
const getButtonStyle = (isSorted: boolean) =>
    isSorted ? 'text-slate-900 bg-slate-100 font-bold' : ''

/**
 * Creates a reusable column header component.
 * @param {string} columnName - The name of the column.
 * @returns A function that returns a JSX element for the column header.
 */
const createColumnHeader =
    (columnName: string) =>
    // @ts-expect-error - column can be any type
    ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(isSorted === 'asc')}
                className={getButtonStyle(isSorted)}
            >
                {columnName}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }

/**
 * Formats a date string to the American format (MM/dd/yyyy).
 * @param {string} value - The date string to format.
 * @returns {string} The formatted date string.
 */
const formatDate = (value: string) => format(new Date(value), 'MM/dd/yyyy')

/**
 * Column definitions for an employee.
 * @type {ColumnDef<EmployeeType>[]}
 */
export const EmployeeColumns: ColumnDef<EmployeeType>[] = [
    {
        accessorKey: 'firstName',
        header: createColumnHeader('First Name'),
    },
    {
        accessorKey: 'lastName',
        header: createColumnHeader('Last Name'),
    },
    {
        accessorKey: 'startDate',
        header: createColumnHeader('Start Date'),
        cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
        accessorKey: 'department',
        header: createColumnHeader('Department'),
    },
    {
        accessorKey: 'dateOfBirth',
        header: createColumnHeader('Date of Birth'),
        cell: ({ getValue }) => formatDate(getValue() as string),
    },
    {
        accessorKey: 'street',
        header: createColumnHeader('Street'),
    },
    {
        accessorKey: 'city',
        header: createColumnHeader('City'),
    },
    {
        accessorKey: 'state',
        header: createColumnHeader('State'),
    },
    {
        accessorKey: 'zipCode',
        header: createColumnHeader('Zip Code'),
    },
]
