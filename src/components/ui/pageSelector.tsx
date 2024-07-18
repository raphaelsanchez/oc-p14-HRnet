import React from 'react'
import { Input } from './input'

/**
 * Represents the props for the PageSelector component.
 */
interface PageSelectorProps {
    pageIndex: number
    pageCount: number
    setPageIndex: (pageIndex: number) => void
}

/**
 * Renders a page selector component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.pageIndex - The current page index.
 * @param {number} props.pageCount - The total number of pages.
 * @param {Function} props.setPageIndex - The function to set the page index.
 * @returns {JSX.Element} The rendered page selector component.
 */
const PageSelector: React.FC<PageSelectorProps> = ({
    pageIndex,
    pageCount,
    setPageIndex,
}) => (
    <div className="flex w-[100px] items-center justify-center gap-1 text-sm">
        <label htmlFor="pageInput" className="sr-only">
            Page Number
        </label>
        <span id="pageLabel">Page</span>
        <Input
            type="number"
            value={pageIndex + 1 || ''}
            onChange={(e) => {
                const pageInput = Number(e.target.value) - 1
                const maxPage = pageCount - 1
                const page = Math.min(Math.max(pageInput, 0), maxPage)
                setPageIndex(page)
            }}
            min={1}
            max={pageCount}
            className="h-8 w-10 rounded border p-1 text-center"
            aria-labelledby="pageLabel"
            aria-valuemin={1}
            aria-valuemax={pageCount}
            aria-valuenow={pageIndex + 1}
            id="pageInput"
        />
        <span aria-live="polite">
            {' of '}
            {pageCount.toLocaleString()}
        </span>
    </div>
)

export default PageSelector
