import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { CircleCheckBig } from 'lucide-react'
import { Link } from 'react-router-dom'

// The EmployeeCreatedDialogProps type.
type EmployeeCreatedDialogProps = {
    open: boolean
    onClose: () => void
}

/**
 * Represents a dialog component that is displayed when an employee is created.
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines whether the dialog is open or not.
 * @param {Function} props.onClose - The function to call when the dialog is closed.
 * @returns {JSX.Element} The rendered EmployeeCreatedDialog component.
 */
const EmployeeCreatedDialog = ({
    open,
    onClose,
}: EmployeeCreatedDialogProps) => (
    <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent className="flex flex-col items-center gap-8">
            <AlertDialogHeader className="gap-4">
                <AlertDialogTitle className="flex flex-col items-center text-4xl">
                    <CircleCheckBig size={80} color="#93AD18" />
                    Employee Created!
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    Your employee has been created successfully. Would you like
                    to add another employee?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-wra flex gap-2">
                <Button asChild variant="secondary">
                    <Link to={'/employees'}>Back to employees list</Link>
                </Button>
                <Button onClick={onClose}>Add new employee</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)

export default EmployeeCreatedDialog
