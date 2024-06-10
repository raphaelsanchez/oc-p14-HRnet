import App from '@/layouts/App.tsx'
import EmployeeForm from '@/pages/EmployeeForm.tsx'
import EmployeeList from '@/pages/EmployeeList.tsx'
import NotFound from '@/pages/NotFound'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Navigate to="/employees" />, // Currently redirect to /employees
            },
            {
                path: '/employees',
                element: <EmployeeList />,
            },
            {
                path: '/employees/new',
                element: <EmployeeForm />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
])
