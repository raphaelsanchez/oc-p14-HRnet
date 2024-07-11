import { EmployeeForm } from '@/components/employees/EmployeeForm'

/**
 * Renders the EmployeeAdd page component.
 * This component displays a form to add a new employee.
 */
export default function EmployeeAdd() {
    return (
        <main className="container mx-auto px-4 py-8">
            <header>
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
                    Add new employee
                </h1>
            </header>
            <EmployeeForm />
        </main>
    )
}
