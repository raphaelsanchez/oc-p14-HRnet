import { Check, ChevronDown, Search } from 'lucide-react'
import React, {
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'

type Option = {
    name: string
    value: string
}

interface SelectBoxProps {
    name: string
    label?: string
    placeholder?: string
    options: Option[]
    searchable?: boolean
    defaultValue?: Option
    onChangeValue?: (value: string) => void
    value?: string
}

const SelectBox: React.FC<SelectBoxProps> = React.memo(
    ({
        name,
        label,
        placeholder = 'Select an option',
        options,
        searchable = true,
        onChangeValue,
        value,
        defaultValue,
    }) => {
        // State management
        const [isOpen, setIsOpen] = useState(false)
        const [selectedOption, setSelectedOption] = useState(
            value || defaultValue?.name || '',
        )
        const [searchTerm, setSearchTerm] = useState('')
        const [focusedIndex, setFocusedIndex] = useState(-1)

        // Refs for DOM elements
        const selectBoxRef = useRef<HTMLDivElement>(null)
        const listRef = useRef<HTMLUListElement>(null)
        const optionRefs = useRef<(HTMLLIElement | null)[]>([])

        // Filter options based on search
        const filteredOptions = options.filter((option) =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        /**
         * Toggles the dropdown visibility and updates the focused index.
         * @param {React.MouseEvent<HTMLButtonElement>} e - The mouse event.
         */
        const toggleDropdown = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                setIsOpen((prev) => !prev)
                if (!isOpen) {
                    setFocusedIndex(0)
                }
            },
            [isOpen],
        )

        /**
         * Handles the selection of an option in the SelectBox component.
         *
         * @param {string} optionValue - The value of the selected option.
         * @returns {void}
         */
        const handleSelectOption = useCallback(
            (optionValue: string) => {
                setSelectedOption(optionValue)
                setSearchTerm('')
                setIsOpen(false)
                onChangeValue?.(optionValue)
            },
            [onChangeValue],
        )

        /**
         * Handles the keydown event for the select box.
         *
         * @param event - The keyboard event.
         */
        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLDivElement>) => {
                if (!isOpen) return

                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        setFocusedIndex(
                            (prevIndex) =>
                                (prevIndex + 1) % filteredOptions.length,
                        )
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        setFocusedIndex(
                            (prevIndex) =>
                                (prevIndex - 1 + filteredOptions.length) %
                                filteredOptions.length,
                        )
                        break
                    case 'Enter':
                    case ' ':
                        event.preventDefault()
                        if (focusedIndex !== -1) {
                            handleSelectOption(
                                filteredOptions[focusedIndex].name,
                            )
                        }
                        break
                    case 'Escape':
                        event.preventDefault()
                        setIsOpen(false)
                        break
                }
            },
            [isOpen, focusedIndex, filteredOptions, handleSelectOption],
        )

        // Update selected option when value changes
        useEffect(() => {
            setSelectedOption(value || defaultValue?.name || '')
        }, [value, defaultValue])

        // Focus the selected option when the dropdown is
        useEffect(() => {
            if (
                isOpen &&
                focusedIndex !== -1 &&
                optionRefs.current[focusedIndex]
            ) {
                optionRefs.current[focusedIndex]?.focus()
            }
        }, [isOpen, focusedIndex])

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    selectBoxRef.current &&
                    !selectBoxRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }, [])

        // Render the SelectBox component
        return (
            <div
                ref={selectBoxRef}
                className="relative"
                onKeyDown={handleKeyDown}
            >
                {label && (
                    <label id={`${name}-label`} htmlFor={name}>
                        {label}
                    </label>
                )}

                <button
                    id={`${name}-button`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby={
                        label
                            ? `${name}-label ${name}-button`
                            : `${name}-button`
                    }
                    onClick={toggleDropdown}
                    className="flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {selectedOption || placeholder}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </button>

                {isOpen && (
                    <div
                        className="absolute z-10 mt-1 w-full rounded-md border bg-white p-1 shadow-md"
                        role="listbox"
                        tabIndex={-1}
                    >
                        {searchable && (
                            <div className="flex items-center gap-2 rounded border p-2 focus-within:ring-2 focus-within:ring-slate-950 focus-within:ring-offset-2">
                                <Search className="h-4 w-4 opacity-50" />
                                <input
                                    type="search"
                                    className="w-full text-sm outline-none"
                                    placeholder={placeholder}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label="Search options"
                                />
                            </div>
                        )}
                        <ul
                            ref={listRef}
                            className="max-h-[300px] overflow-auto py-2"
                            role="listbox"
                            aria-labelledby={`${name}-label`}
                            aria-activedescendant={
                                focusedIndex !== -1 &&
                                filteredOptions[focusedIndex]
                                    ? `${name}-option-${filteredOptions[focusedIndex].value}`
                                    : undefined
                            }
                        >
                            <div className="sr-only">
                                {filteredOptions.length} options available
                            </div>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={option.value}
                                        ref={(el) =>
                                            (optionRefs.current[index] = el)
                                        }
                                        id={`${name}-option-${option.value}`}
                                        role="option"
                                        aria-selected={
                                            selectedOption === option.name
                                        }
                                        className="relative flex cursor-pointer items-center rounded p-2 ps-8 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100"
                                        tabIndex={
                                            focusedIndex === index ? 0 : -1
                                        }
                                        onClick={() =>
                                            handleSelectOption(option.name)
                                        }
                                    >
                                        {selectedOption === option.name && (
                                            <span className="absolute left-2 mr-2">
                                                <Check className="h-4 w-4" />
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            {option.name}{' '}
                                            <small className="text-xxs text-slate-400">
                                                ({option.value})
                                            </small>
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="cursor-pointer rounded p-2 text-sm text-slate-400">
                                    No results found
                                </li>
                            )}
                        </ul>
                    </div>
                )}

                {/* Hidden select element necessary for form submission */}
                <select
                    name={name}
                    id={name}
                    value={selectedOption}
                    onChange={(e) => handleSelectOption(e.target.value)}
                    style={{ display: 'none' }}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        )
    },
)

SelectBox.displayName = 'SelectBox'

export default SelectBox
