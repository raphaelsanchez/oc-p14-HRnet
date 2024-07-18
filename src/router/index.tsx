/* eslint-disable react-refresh/only-export-components */
import Loading from '@/components/ui/loading'
import React, { Suspense } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'

// Using React.lazy for lazy loading
// eslint-disable-next-line react-refresh/only-export-components
const App = React.lazy(() => import('@/layouts/App.tsx'))
const EmployeeAdd = React.lazy(() => import('@/pages/EmployeeAdd'))
const EmployeeList = React.lazy(() => import('@/pages/EmployeeList'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

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
                element: (
                    <Suspense fallback={<Loading />}>
                        <EmployeeList />
                    </Suspense>
                ),
            },
            {
                path: '/employees/new',
                element: (
                    <Suspense fallback={<Loading />}>
                        <EmployeeAdd />
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<Loading />}>
                        <NotFound />
                    </Suspense>
                ),
            },
        ],
    },
])
