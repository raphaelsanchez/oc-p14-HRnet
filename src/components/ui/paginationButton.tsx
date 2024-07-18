import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import React from 'react'
import { Button } from './button'

interface PaginationButtonsProps {
    table: {
        firstPage: () => void
        previousPage: () => void
        nextPage: () => void
        lastPage: () => void
        getCanPreviousPage: () => boolean
        getCanNextPage: () => boolean
    }
}

/**
 * Renders pagination buttons for a table.
 * @param {PaginationButtonsProps} props - The component props.
 * @param {TableInstance} props.table - The table instance.
 * @returns {JSX.Element} - The pagination buttons component.
 */
const PaginationButtons: React.FC<PaginationButtonsProps> = ({ table }) => (
    <div className="flex items-center space-x-2">
        {/* First page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-1"
            aria-label="First page"
        >
            <ChevronsLeft />
        </Button>
        {/* Previous page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-1"
            aria-label="Previous page"
        >
            <ChevronLeft />
        </Button>
        {/* Next page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-1"
            aria-label="Next page"
        >
            <ChevronRight />
        </Button>
        {/* Last page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-1"
            aria-label="Last page"
        >
            <ChevronsRight />
        </Button>
    </div>
)

export default PaginationButtons
