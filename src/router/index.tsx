import App from '@/layouts/App.tsx'
import EmployeeAdd from '@/pages/EmployeeAdd'
import EmployeeList from '@/pages/EmployeeList'
import NotFound from '@/pages/NotFound'
import { Navigate, createBrowserRouter } from 'react-router-dom'

/**
 * Defines the router configuration for the application.
 * @returns {BrowserRouter} The configured router.
 */
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
                element: <EmployeeAdd />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
])
