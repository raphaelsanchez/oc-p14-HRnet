import { EmployeeColumns } from '@/components/employees/EmployeeColumns'
import { Button } from '@/components/ui/button'
import { DataTable as EmployeesTable } from '@/components/ui/data-table'
import { useEmployeesStore } from '@/store/useEmployeesStore'
import { Plus } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

/**
 * Renders the EmployeeList component.
 *
 * @returns The rendered EmployeeList component.
 */
export default function EmployeeList() {
    // Retrieve the employees from the store.
    const { employees } = useEmployeesStore()

    // Memoize the EmployeesTable component to prevent unnecessary re-renders.
    const memoizedEmployeesTable = useMemo(
        () => <EmployeesTable columns={EmployeeColumns} data={employees} />,
        [employees],
    )

    return (
        <main className="container mx-auto px-4 py-8">
            <header className="flex items-center justify-between">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
                    Employees
                </h1>
                <Button asChild>
                    <Link to={'/employees/new'}>
                        <Plus />
                        <span className="hidden md:inline-block">
                            Add employee
                        </span>
                    </Link>
                </Button>
            </header>
            {memoizedEmployeesTable}
        </main>
    )
}
