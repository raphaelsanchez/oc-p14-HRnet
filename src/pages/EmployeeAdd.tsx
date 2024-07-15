import EmployeeCreatedDialog from '@/components/employees/EmployeeCreatedDialog' // Nouveau composant pour le dialogue
import { EmployeeForm } from '@/components/employees/EmployeeForm'
import { useState } from 'react'

/**
 * Renders a form to add a new employee and a dialog on submission.
 */
const EmployeeAdd = () => {
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)

    return (
        <main className="container mx-auto px-4 py-8">
            <header>
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
                    Add new employee
                </h1>
            </header>
            <EmployeeForm onFormSubmit={() => setAlertDialogOpen(true)} />
            <EmployeeCreatedDialog
                open={alertDialogOpen}
                onClose={() => setAlertDialogOpen(false)}
            />
        </main>
    )
}
export default EmployeeAdd
