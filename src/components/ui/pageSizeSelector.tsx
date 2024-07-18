import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React, { useMemo } from 'react'

/**
 * Represents the props for the PageSizeSelector component.
 */
interface PageSizeSelectorProps {
    pageSize: number
    setPagination: React.Dispatch<
        React.SetStateAction<{
            pageSize: number
            pageIndex: number
        }>
    >
}

/**
 * Component for selecting the number of items per page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.pageSize - The current page size.
 * @param {Function} props.setPagination - The function to update the pagination state.
 * @returns {JSX.Element} The rendered PageSizeSelector component.
 */

const pageSizeOptions = [10, 25, 50, 100]

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
    pageSize,
    setPagination,
}) => {
    const options = useMemo(() => pageSizeOptions, [])

    return (
        <div className="flex items-center space-x-2">
            <label
                id="pageSizeLabel"
                className="text-sm"
                htmlFor="pageSizeSelect"
            >
                Items per page
            </label>
            <Select
                onValueChange={(value) => {
                    const newSize = Number(value)
                    setPagination((prev) => ({
                        ...prev,
                        pageSize: newSize,
                    }))
                }}
            >
                <SelectTrigger
                    className="h-8 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    id="pageSizeSelect"
                    aria-labelledby="pageSizeLabel"
                >
                    <SelectValue placeholder={pageSize.toString()} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                            {size}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default PageSizeSelector
