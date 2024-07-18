'user client'
import { departments, states } from '@/data/options'
import { cn } from '@/lib/utils'
import { employeesFormSchema } from '@/schemas/employeesFormSchema'
import { useEmployeesStore } from '@/store/useEmployeesStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectBox } from '@raphysan/selectbox-react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface EmployeeFormProps {
    onFormSubmit: () => void
}

type StateOption = {
    name: string
    value: string
}

type DepartementOption = {
    name: string
}

/**
 * Component for rendering a form to add an employee.
 *
 * @returns The rendered EmployeeForm component.
 */
export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onFormSubmit }) => {
    // Define form
    const form = useForm<z.infer<typeof employeesFormSchema>>({
        resolver: zodResolver(employeesFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            department: '',
            dateOfBirth: undefined,
            startDate: undefined,
        },
    })

    // Memoize the options for the select boxes
    const statesOptions: StateOption[] = useMemo(
        () =>
            states.map((state) => ({
                name: state.name,
                value: state.abbreviation,
            })),
        [],
    )

    const departmentsOptions: DepartementOption[] = useMemo(
        () =>
            departments.map((department) => ({
                name: department.name,
            })),
        [],
    )

    /**
     * Handles the form submission event.
     * @param values - The form values.
     */
    const onSubmit = (values: z.infer<typeof employeesFormSchema>) => {
        // Add employee to the zustand store
        const employeeWithId = {
            ...values,
            id: uuidv4(),
            dateOfBirth: format(new Date(values.dateOfBirth), 'yyyy-MM-dd'),
            startDate: format(new Date(values.startDate), 'yyyy-MM-dd'),
        }
        useEmployeesStore.getState().addEmployee(employeeWithId)

        // Open the alert dialog from the parent component
        onFormSubmit()

        // Reset all fields
        form.reset()
    }

    return (
        <Form {...form}>
            <form
                className="mb-4 mt-8 space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
                aria-label="Add employee form"
            >
                <fieldset
                    id="PersonalInformations"
                    className="space-y-4 rounded border border-slate-200 bg-white p-4 pt-0"
                >
                    <legend className="rounded bg-slate-200 px-2 py-0 text-sm font-semibold text-slate-600">
                        Personal informations
                    </legend>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem
                                className={`${form.formState.errors.firstName ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel>FirstName</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ex. John"
                                        {...field}
                                        autofocus
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem
                                className={`${form.formState.errors.lastName ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel>LastName</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex. Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem
                                className={`flex flex-col ${form.formState.errors.dateOfBirth ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : 'border-none p-0'}`}
                            >
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-slate-500',
                                                )}
                                                aria-label="Select date of birth"
                                            >
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        'MM/dd/yyyy',
                                                    )
                                                ) : (
                                                    <span>mm/dd/yyyy</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            captionLayout="dropdown"
                                            fromYear={1950}
                                            defaultMonth={
                                                field.value
                                                    ? new Date(field.value)
                                                    : undefined
                                            }
                                            toYear={
                                                new Date().getFullYear() - 16
                                            }
                                            selected={
                                                field.value
                                                    ? new Date(field.value)
                                                    : undefined
                                            }
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1950-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Employee must be at least 16 years old
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </fieldset>

                <fieldset
                    id="Address"
                    className="space-y-4 rounded-md border border-slate-200 bg-white p-4 pt-0"
                >
                    <legend className="rounded bg-slate-200 px-2 py-0 text-sm font-semibold text-slate-600">
                        Address
                    </legend>
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem
                                className={`${form.formState.errors.street ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel>Street</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ex. 221B Baker Street"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem
                                className={`${form.formState.errors.city ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ex. New York"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem
                                className={`${form.formState.errors.state ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel htmlFor="state">State</FormLabel>
                                <SelectBox
                                    name={field.name}
                                    options={statesOptions}
                                    onChangeValue={field.onChange}
                                    value={field.value || ''}
                                    defaultValue={{
                                        name: 'Select a state',
                                        value: '',
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem
                                className={`${form.formState.errors.zipCode ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex. 1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </fieldset>

                <fieldset
                    id="InternalInformations"
                    className="space-y-4 rounded border border-slate-200 bg-white p-4 pt-0"
                >
                    <legend className="rounded bg-slate-200 px-2 py-0 text-sm font-semibold text-slate-600">
                        Internal informations
                    </legend>
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem
                                className={`${form.formState.errors.department ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel>Department</FormLabel>
                                <SelectBox
                                    name={field.name}
                                    options={departmentsOptions}
                                    onChangeValue={field.onChange}
                                    value={field.value || ''}
                                    searchable={false}
                                    defaultValue={{
                                        name: 'Select a department',
                                        value: '',
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem
                                className={`flex flex-col ${form.formState.errors.startDate ? 'rounded border border-red-500 bg-red-50 px-4 py-2' : ''}`}
                            >
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-slate-500',
                                                )}
                                                aria-label="Select date of start"
                                            >
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        'MM/dd/yyyy',
                                                    )
                                                ) : (
                                                    <span>mm/dd/yyyy</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            captionLayout="dropdown"
                                            fromYear={1950}
                                            defaultMonth={field.value}
                                            toYear={
                                                new Date().getFullYear() + 1
                                            }
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date('1950-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </fieldset>
                <footer className="flex flex-row-reverse items-center justify-between">
                    <Button type="submit">Add employee</Button>
                    <Button asChild variant="secondary">
                        <Link to={'/employees'}>Return to employee list</Link>
                    </Button>
                </footer>
            </form>
        </Form>
    )
}
