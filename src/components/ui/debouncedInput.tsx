import React, { useCallback, useEffect, useState } from 'react'
import { Input } from './input'

/**
 * A debounced input component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string | number} props.value - The initial value of the input.
 * @param {(value: string | number) => void} props.onChange - The callback function to be called when the value of the input changes.
 * @param {number} [props.debounce=500] - The debounce time in milliseconds.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [props] - Additional input element attributes.
 * @returns {JSX.Element} - The debounced input component.
 */
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)

    // Using useCallback to avoid recreating the function on every render
    const debouncedOnChange = useCallback(() => {
        const handler = setTimeout(() => onChange(value), debounce)
        return () => clearTimeout(handler)
    }, [value, debounce, onChange])

    // Call debouncedOnChange on every change of value, debounce, or onChange
    useEffect(() => {
        const cleanup = debouncedOnChange()
        return cleanup
    }, [debouncedOnChange])

    return (
        <Input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default DebouncedInput
