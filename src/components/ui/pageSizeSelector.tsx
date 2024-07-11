import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React from 'react'

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
const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
    pageSize,
    setPagination,
}) => (
    <div className="flex items-center space-x-2">
        <p className="text-sm">Items per page</p>
        <Select
            onValueChange={(value) => {
                const newSize = Number(value)
                setPagination((prev) => ({
                    ...prev,
                    pageSize: newSize,
                }))
            }}
        >
            <SelectTrigger className="h-8">
                <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
                {[10, 25, 50, 100].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                        {size}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
)

export default PageSizeSelector
